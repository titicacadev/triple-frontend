import * as React from 'react'
import { likeReview, unlikeReview, fetchMyReviews } from './review-api-clients'
import { MyReviewsProvider } from './my-review-context'
import { ReviewContainer } from './review-container'
import { ReviewLikesProvider } from './review-likes-context'
import { TransitionModal } from '@titicaca/modals'
export default function Reviews({
  shortened,
  regionId,
  resourceId,
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
  historyActions,
}: {
  shortened?: boolean
  regionId: string
  resourceId: string
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
  historyActions: any //@TODO triple-react-context 주입하면서 삭제
}) {
  const { back } = historyActions
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
          resourceId={resourceId}
          resourceType={resourceType}
          reviewed={reviewed}
          onFullListButtonClick={onFullListButtonClick}
          notifyReviewDeleted={notifyReviewDeleted}
          showToast={showToast}
          historyActions={historyActions}
        />
        <TransitionModal onClose={back} />
      </ReviewLikesProvider>
    </MyReviewsProvider>
  )
}
