import * as React from 'react'
import { likeReview, unlikeReview, fetchMyReviews } from './review-api-clients'
import { ReviewProvider } from './review-context'
import { ReviewContainer } from './review-container'
import { TransitionModal } from './transition-modals'
export default function Reviews({
  shortened,
  regionId,
  source,
  withRating,
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
  withRating?: any
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
    <ReviewProvider
      likeReview={likeReview}
      unlikeReview={unlikeReview}
      fetchMyReviews={fetchMyReviews}
      notifyReviewLiked={notifyReviewLiked}
      notifyReviewUnliked={notifyReviewUnliked}
      subscribeLikedChangeEvent={subscribeLikedChangeEvent}
      subscribeReviewUpdateEvent={subscribeReviewUpdateEvent}
    >
      <ReviewContainer
        shortened={shortened}
        regionId={regionId}
        isPublic={isPublic}
        APP_URL_SCHEME={APP_URL_SCHEME}
        reviewsCount={reviewsCount}
        withRating={withRating}
        source={source}
        resourceType={resourceType}
        reviewed={reviewed}
        onFullListButtonClick={onFullListButtonClick}
        notifyReviewDeleted={notifyReviewDeleted}
        showToast={showToast}
      />
      <TransitionModal source={source} />
    </ReviewProvider>
  )
}
