import * as React from 'react'
import { likeReview, unlikeReview, fetchMyReviews } from './review-api-clients'
import { MyReviewsProvider } from './my-review-context'
import { ReviewContainer } from './review-container'
import { ReviewLikesProvider } from './review-likes-context'
export default function Reviews({
  shortened,
  regionId,
  source,
  resourceType,
  reviewed,
  isPublic,
  reviewsCount,
  onFullListButtonClick,
  APP_URL_SCHEME,
  subscribeLikedChangeEvent,
  subscribeReviewUpdateEvent,
  notifyReviewLiked,
  notifyReviewUnliked,
  notifyReviewDeleted,
  showToast,
}: {
  shortened?: boolean
  regionId: string
  source: any
  resourceType: string
  reviewed?: any
  isPublic: boolean
  reviewsCount: number
  onFullListButtonClick?: any
  APP_URL_SCHEME: string
  subscribeLikedChangeEvent: any
  subscribeReviewUpdateEvent: any
  notifyReviewLiked: any
  notifyReviewUnliked: any
  notifyReviewDeleted: any
  showToast: any
}) {
  const {
    subscribeLikedChangeEvent,
    subscribeReviewUpdateEvent,
    notifyReviewLiked,
    notifyReviewUnliked,
  } = appNativeActions
  return (
    <MyReviewsProvider
      fetchMyReview={fetchMyReviews}
      subscribeReviewUpdateEvent={subscribeReviewUpdateEvent}
    >
      <ReviewLikesProvider
        likeReview={likeReview}
        unlikeReview={unlikeReview}
        subscribeLikedChangeEvent={subscribeLikedChangeEvent}
        notifyReviewLiked={notifyReviewLiked}
        notifyReviewUnliked={notifyReviewUnliked}
      >
        <ReviewContainer
          shortened={shortened}
          regionId={regionId}
          isPublic={isPublic}
          APP_URL_SCHEME={APP_URL_SCHEME}
          reviewsCount={reviewsCount}
          source={source}
          resourceType={resourceType}
          reviewed={reviewed}
          onFullListButtonClick={onFullListButtonClick}
          notifyReviewDeleted={notifyReviewDeleted}
          showToast={showToast}
        />
      </ReviewLikesProvider>
    </MyReviewsProvider>
  )
}
