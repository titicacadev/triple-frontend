import { List, Spinner } from '@titicaca/tds-ui'
import { useEffect, useMemo, useState } from 'react'
import { useClientAppActions } from '@titicaca/triple-web'

import { BaseReviewFragment } from '../../data/graphql'
import { useDescriptions, useMyReview } from '../../services'
import { FullListButton } from '../full-list-button'
import { MileageButton } from '../mileage-button'
import { MyReviewActionSheet } from '../my-review-action-sheet'
import { OthersReviewActionSheet } from '../others-review-action-sheet'
import { ReviewElement } from '../review-element'
import { ReviewsPlaceholder } from '../review-placeholder-with-rating'
import type { SortingType, SortingOption } from '../sorting-context'

interface Props {
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
  refetch: () => void
}

export function ReviewsList({
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
  refetch,
}: Props) {
  const [selectedReviewId, setSelectedReviewId] = useState<string | undefined>(
    undefined,
  )
  const {
    subscribeLikedChangeEvent,
    unsubscribeLikedChangeEvent,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  } = useClientAppActions()

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

    if (reviews.length === 0) {
      return []
    }

    // subscribe 이벤트로 인한 refetch 시 내 리뷰가 바뀐 경우를 반영하기 위해
    // 내 리뷰를 새로 받은 리뷰 목록에서 찾아서 교체한 후에 내 리뷰를 맨 앞으로 보냄
    let myReview = myReviewData.myReview
    let newReviews: BaseReviewFragment[] = []
    reviews.forEach((review) => {
      if (myReview && review.id === myReview.id) {
        myReview = review
      } else {
        newReviews.push(review)
      }
    })
    if (myReview) {
      newReviews = [myReview].concat(newReviews)
    }

    return newReviews
  }, [myReviewData, reviews])

  useEffect(() => {
    subscribeLikedChangeEvent?.(refetch)

    return () => unsubscribeLikedChangeEvent?.(refetch)
  }, [refetch, subscribeLikedChangeEvent, unsubscribeLikedChangeEvent])

  useEffect(() => {
    subscribeReviewUpdateEvent?.(refetch)

    return () => unsubscribeReviewUpdateEvent?.(refetch)
  }, [refetch, subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent])

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
        sortingType={sortingType}
        sortingOption={sortingOption}
        hasMedia={hasMedia}
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
        hasMedia={hasMedia}
        recentTrip={recentTrip}
        sortingType={sortingType}
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
