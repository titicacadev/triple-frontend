import { useEffect, useMemo, useState } from 'react'
import { List } from '@titicaca/kint5-core-elements'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { useDescriptions, useMyReview } from '../../services'
import { BaseReviewFragment } from '../../data/graphql'
import {
  TripleGlobalReviewElement,
  TripleReviewElement,
} from '../review-element'
import { MyReviewActionSheet } from '../my-review-action-sheet'
import { OthersReviewActionSheet } from '../others-review-action-sheet'
import { ReviewsPlaceholder } from '../review-placeholder-with-rating'
import type { SortingType, SortingOption } from '../sorting-context'
import { useReviewLanguage } from '../language-context'
import { ReviewSkeleton } from '../review-skeleton'

interface Props {
  isGlobal: boolean
  resourceId: string
  resourceType: string
  regionId: string | undefined
  hasMedia: boolean
  recentTrip: boolean
  placeholderText: string | undefined
  sortingType?: SortingType
  sortingOption: SortingOption
  reviewsCount: number | undefined
  reviews: BaseReviewFragment[] | undefined
  hasNextPage?: boolean
  isLoadingReviews: boolean
  fetchNextPage?: () => void
  refetch: () => void
}

export function InfiniteList({
  isGlobal,
  resourceId,
  resourceType,
  regionId,
  hasMedia,
  recentTrip,
  placeholderText,
  sortingType,
  sortingOption,
  reviewsCount,
  reviews,
  hasNextPage,
  isLoadingReviews,
  fetchNextPage,
  refetch,
}: Props) {
  const { reviewLang } = useReviewLanguage()
  const [selectedReviewId, setSelectedReviewId] = useState<string | undefined>(
    undefined,
  )
  const { subscribeLikedChangeEvent, unsubscribeLikedChangeEvent } =
    useTripleClientActions()

  const { data: myReviewData } = useMyReview({
    resourceId,
    resourceType,
    lang: reviewLang,
  })
  const { data: descriptionsData } = useDescriptions({
    resourceId,
    resourceType,
    lang: reviewLang,
  })

  const sortedReviews = useMemo(() => {
    if (!reviews || !myReviewData) {
      return undefined
    }

    let newReviews = reviews.filter(
      (review) => review.id !== myReviewData.myReview?.id,
    )

    if (myReviewData.myReview) {
      newReviews = [myReviewData.myReview].concat(newReviews)
    }

    return newReviews
  }, [myReviewData, reviews])

  useEffect(() => {
    subscribeLikedChangeEvent?.(refetch)

    return () => unsubscribeLikedChangeEvent?.(refetch)
  }, [refetch, subscribeLikedChangeEvent, unsubscribeLikedChangeEvent])

  if (
    !myReviewData ||
    !descriptionsData ||
    !sortedReviews ||
    isLoadingReviews
  ) {
    return (
      <ul>
        <li>
          <ReviewSkeleton />
        </li>
        <li
          css={{
            borderTop: '1px solid var(--color-kint5-gray20)',
            margin: '24px 0',
          }}
        >
          <ReviewSkeleton />
        </li>
      </ul>
    )
  }

  if (sortedReviews.length === 0) {
    return (
      <ReviewsPlaceholder
        hasReviews={(reviewsCount ?? 0) > 0}
        isMorePage={!!hasNextPage}
        resourceId={resourceId}
        resourceType={resourceType}
        regionId={regionId}
        sortingType={sortingType}
        sortingOption={sortingOption}
        hasMedia={hasMedia}
        recentTrip={recentTrip}
        placeholderText={placeholderText}
      />
    )
  }

  const ReviewElement = isGlobal
    ? TripleGlobalReviewElement
    : TripleReviewElement

  return (
    <>
      <List divided margin={{ top: 26 }} verticalGap={48}>
        {sortedReviews.map((review, i) => (
          <ReviewElement
            key={i}
            isFullList
            isMyReview={myReviewData.myReview?.id === review.id}
            review={review}
            reviewRateDescriptions={
              descriptionsData.reviewsSpecification?.rating?.description
            }
            resourceId={resourceId}
            regionId={regionId}
            onMenuClick={setSelectedReviewId}
          />
        ))}
      </List>

      {hasNextPage ? (
        <StaticIntersectionObserver
          onChange={({ isIntersecting }) => {
            if (isIntersecting) {
              fetchNextPage?.()
            }
          }}
        >
          <div />
        </StaticIntersectionObserver>
      ) : null}

      {myReviewData?.myReview ? (
        <MyReviewActionSheet
          reviewId={myReviewData.myReview.id}
          reviewBlinded={myReviewData.myReview.blinded ?? false}
          resourceType={resourceType}
          resourceId={resourceId}
          regionId={regionId}
          lang={reviewLang}
        />
      ) : null}

      {selectedReviewId ? (
        <OthersReviewActionSheet reviewId={selectedReviewId} />
      ) : null}
    </>
  )
}
