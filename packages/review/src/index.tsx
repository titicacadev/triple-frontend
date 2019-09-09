import * as React from 'react'
import {
  subscribeLikedChangeEvent,
  subscribeReviewUpdateEvent,
  notifyReviewLiked,
  notifyReviewUnliked,
} from '@titicaca/triple-web-to-native-interfaces'
import { likeReview, unlikeReview, fetchMyReviews } from './review-api-clients'
import { ReviewProvider } from './review-context'
import { ReviewContainer } from './review-container'
import { TransitionModal } from './transition-modals'
export default function Reviews({
  shortened,
  regionId,
  source,
  withRating,
  type,
  reviewed,
  isPublic,
  reviewsCount,
  onFullListButtonClick,
  APP_URL_SCHEME,
}: {
  shortened?: boolean
  regionId: string
  source: any
  withRating?: any
  type: string
  reviewed?: any
  isPublic: boolean
  reviewsCount: number
  onFullListButtonClick?: any
  APP_URL_SCHEME: string
}) {
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
        type={type}
        reviewed={reviewed}
        onFullListButtonClick={onFullListButtonClick}
      />
      <TransitionModal source={source} />
    </ReviewProvider>
  )
}
