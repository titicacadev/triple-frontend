import React, { useState } from 'react'
import { List, MarginPadding } from '@titicaca/core-elements'
import {
  useHistoryContext,
  useUserAgentContext,
  useEventTrackingContext,
} from '@titicaca/react-contexts'
import ReviewElement, { ReviewElementProps } from './review-element'
import ReviewTimestamp from './review-timestamp'
import { HASH_MY_REVIEW_ACTION_SHEET } from './my-review-action-sheet'
import OthersReviewActionSheet, {
  HASH_REVIEW_ACTION_SHEET,
} from './others-review-action-sheet'
import { likeReview, unlikeReview } from './review-api-clients'
import { useReviewLikesContext } from './review-likes-context'
import { AppNativeActionProps, ReviewData } from './types'

export default function ReviewsList({
  myReview,
  reviews,
  fetchNext,
  appUrlScheme,
  margin,
  resourceId,
  maxLength,
  reviewRateDescriptions,
  showToast,
}: {
  myReview?: ReviewData
  reviews: ReviewData[]
  fetchNext?: () => void
  appUrlScheme: string
  margin: MarginPadding
  resourceId: string
  maxLength?: number
  reviewRateDescriptions?: string[]
  showToast: AppNativeActionProps['showToast']
}) {
  const [selectedReview, setSelectedReview] = useState<ReviewData | undefined>(
    undefined,
  )
  const { isPublic } = useUserAgentContext()
  const { trackEvent } = useEventTrackingContext()
  const { updateLikedStatus } = useReviewLikesContext()
  const { push } = useHistoryContext()

  const handleUserClick: ReviewElementProps['onUserClick'] = (
    e,
    { user: { uid, unregister, mileage } },
  ) => {
    const { level } = mileage || { level: 0 }
    trackEvent({
      ga: ['리뷰 프로필'],
      fa: {
        action: '리뷰_프로필',
        item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
        user_id: uid, // eslint-disable-line @typescript-eslint/camelcase
        level,
      },
    })

    if (isPublic) {
      return
    }

    if (unregister) {
      showToast('탈퇴한 사용자입니다.')
    } else {
      window.location.href = `${appUrlScheme}:///users/${uid}`
    }
  }

  const handleLikeButtonClick: ReviewElementProps['onLikeButtonClick'] = async (
    e,
    { id, liked },
  ) => {
    const response = await (liked ? unlikeReview({ id }) : likeReview({ id }))

    if (response.ok) {
      updateLikedStatus({ [id]: !liked }, resourceId)
    }
  }

  const handleMenuClick: ReviewElementProps['onMenuClick'] = (e, review) => {
    if (!isPublic) {
      if (myReview && review.id === myReview.id) {
        push(HASH_MY_REVIEW_ACTION_SHEET)
      } else {
        setSelectedReview(review)
        push(HASH_REVIEW_ACTION_SHEET)
      }
    }
  }

  const handleShow = fetchNext
    ? (index: number) => index > reviews.length - 3 && fetchNext()
    : undefined

  const allReviews = myReview ? [myReview, ...(reviews || [])] : reviews
  const displayedReviews = maxLength
    ? allReviews.slice(0, maxLength)
    : allReviews

  return (
    <>
      <List margin={margin} divided verticalGap={60}>
        {displayedReviews.map((review, i) => (
          <ReviewElement
            isMyReview={!!(myReview && myReview.id === review.id)}
            key={review.id}
            index={i}
            review={review}
            reviewRateDescriptions={reviewRateDescriptions}
            onUserClick={handleUserClick}
            onLikeButtonClick={handleLikeButtonClick}
            onMenuClick={handleMenuClick}
            likeVisible={!isPublic}
            menuVisible={!isPublic}
            resourceId={resourceId}
            DateFormatter={ReviewTimestamp}
            onShow={handleShow}
          />
        ))}
      </List>

      <OthersReviewActionSheet
        appUrlScheme={appUrlScheme}
        selectedReview={selectedReview}
      />
    </>
  )
}
