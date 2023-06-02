import { useEffect, useMemo, useState } from 'react'
import { List, Spinner } from '@titicaca/core-elements'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'

import { useDescriptions, useMyReview } from '../services'
import { BaseReviewFragment } from '../data/graphql'

import { ReviewElement } from './review-element'
import { MyReviewActionSheet } from './my-review-action-sheet'
import { OthersReviewActionSheet } from './others-review-action-sheet'
import { ReviewsPlaceholder } from './review-placeholder-with-rating'
import { FullListButton } from './full-list-button'
import { MileageButton } from './mileage-button'
import { SortingOption } from './types'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  placeholderText: string | undefined
  sortingOption: SortingOption
  reviewsCount: number | undefined
  reviews: BaseReviewFragment[] | undefined
  refetch: () => void
}

export function ReviewsList({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  placeholderText,
  sortingOption,
  reviewsCount,
  reviews,
  refetch,
}: Props) {
  const [selectedReviewId, setSelectedReviewId] = useState<string | undefined>(
    undefined,
  )
  const { subscribeLikedChangeEvent, unsubscribeLikedChangeEvent } =
    useTripleClientActions()

  const { data: myReviewData } = useMyReview({
    resourceId,
    resourceType,
  })
  const { data: descriptionsData } = useDescriptions({
    resourceId,
    resourceType,
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

  if (!myReviewData || !descriptionsData || !sortedReviews) {
    return <Spinner />
  }

  if (sortedReviews.length === 0) {
    return (
      <ReviewsPlaceholder
        hasReviews={(reviewsCount ?? 0) > 0}
        isMorePage={false}
        resourceId={resourceId}
        resourceType={resourceType}
        regionId={regionId}
        sortingOption={sortingOption}
        recentTrip={recentTrip}
        placeholderText={placeholderText}
      />
    )
  }

  return (
    <>
      <List divided margin={{ top: 24 }} verticalGap={48}>
        {sortedReviews.map((review, i) => (
          <ReviewElement
            key={i}
            isFullList={false}
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

      <FullListButton
        reviewsCount={reviewsCount}
        resourceId={resourceId}
        resourceType={resourceType}
        regionId={regionId}
        recentTrip={recentTrip}
        sortingOption={sortingOption}
      />

      <MileageButton resourceId={resourceId} />

      {myReviewData?.myReview ? (
        <MyReviewActionSheet
          reviewId={myReviewData.myReview.id}
          reviewBlinded={myReviewData.myReview.blinded ?? false}
          resourceType={resourceType}
          resourceId={resourceId}
          regionId={regionId}
        />
      ) : null}

      {selectedReviewId ? (
        <OthersReviewActionSheet reviewId={selectedReviewId} />
      ) : null}
    </>
  )
}
