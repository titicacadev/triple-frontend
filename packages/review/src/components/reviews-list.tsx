import { SyntheticEvent, useCallback, useState } from 'react'
import { List } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { TransitionType } from '@titicaca/modals'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { Timestamp } from '@titicaca/view-utilities'

import ReviewElement, { ReviewElementProps } from './review-element'
import { HASH_MY_REVIEW_ACTION_SHEET } from './my-review-action-sheet'
import OthersReviewActionSheet, {
  HASH_REVIEW_ACTION_SHEET,
} from './others-review-action-sheet'
import { AppNativeActionProps, ReviewData } from './types'
import { useClientActions } from './hook/use-client-actions'

export default function ReviewsList({
  myReview,
  reviews,
  regionId,
  fetchNext,
  resourceId,
  maxLength,
  reviewRateDescriptions,
  showToast,
}: {
  myReview?: ReviewData
  reviews: ReviewData[]
  fetchNext?: () => void
  regionId?: string
  resourceId: string
  maxLength?: number
  reviewRateDescriptions?: string[]
  showToast: AppNativeActionProps['showToast']
}) {
  const [selectedReview, setSelectedReview] = useState<ReviewData | undefined>(
    undefined,
  )
  const app = useTripleClientMetadata()
  const { trackEvent } = useEventTrackingContext()
  const { push } = useHistoryFunctions()
  const { navigateUserDetail, navigateReviewDetail, reportReview } =
    useClientActions()

  const handleUserClick: ReviewElementProps['onUserClick'] = useSessionCallback(
    useCallback(
      (
        e: SyntheticEvent,
        { user: { uid, unregister, mileage }, id }: ReviewData,
      ) => {
        const { level } = mileage || { level: 0 }
        trackEvent({
          ga: ['리뷰 프로필'],
          fa: {
            action: '리뷰_프로필',
            item_id: resourceId,
            user_id: uid,
            review_id: id,
            level,
          },
        })

        if (unregister) {
          showToast('탈퇴한 사용자입니다.')
        } else {
          navigateUserDetail(uid)
        }
      },
      [trackEvent, resourceId, showToast, navigateUserDetail],
    ),
  )

  const handleMenuClick: ReviewElementProps['onMenuClick'] = useSessionCallback(
    useCallback(
      (e: SyntheticEvent, review: ReviewData) => {
        if (app) {
          if (myReview && review.id === myReview.id) {
            push(HASH_MY_REVIEW_ACTION_SHEET)
          } else {
            setSelectedReview(review)
            push(HASH_REVIEW_ACTION_SHEET)
          }
        }
      },
      [app, myReview, push],
    ),
  )

  const handleReviewClick = useCallback(
    (e: SyntheticEvent, reviewId: string) => {
      e.preventDefault()
      e.stopPropagation()
      trackEvent({
        ga: ['리뷰_리뷰선택', resourceId],
        fa: {
          action: '리뷰_리뷰선택',
          item_id: resourceId,
          review_id: reviewId,
        },
      })
      navigateReviewDetail({ reviewId, regionId, resourceId })
    },
    [trackEvent, resourceId, navigateReviewDetail, regionId],
  )

  const handleMessageCountClick = useAppCallback(
    TransitionType.General,
    useSessionCallback(
      useCallback(
        (e: SyntheticEvent, reviewId: string, resourceType: string) => {
          trackEvent({
            ga: ['리뷰_댓글', regionId],
            fa: {
              action: '리뷰_댓글',
              item_id: resourceId,
              review_id: reviewId,
              region_id: regionId,
              content_type: resourceType,
            },
          })

          navigateReviewDetail({
            reviewId,
            regionId,
            resourceId,
            anchor: 'reply',
          })
        },
        [navigateReviewDetail, regionId, resourceId, trackEvent],
      ),
    ),
  )

  const handleShow = fetchNext
    ? (index: number) => index > reviews.length - 3 && fetchNext()
    : undefined

  const allReviews = myReview ? [myReview, ...(reviews || [])] : reviews
  const displayedReviews = maxLength
    ? allReviews.slice(0, maxLength)
    : allReviews

  return (
    <>
      <List divided margin={{ top: 24 }} verticalGap={48}>
        {displayedReviews.map((review, i) => (
          <ReviewElement
            isMyReview={!!(myReview && myReview.id === review.id)}
            key={review.id}
            index={i}
            review={review}
            reviewRateDescriptions={reviewRateDescriptions}
            onUserClick={app ? handleUserClick : undefined}
            onMenuClick={handleMenuClick}
            onReviewClick={handleReviewClick}
            onMessageCountClick={handleMessageCountClick}
            resourceId={resourceId}
            DateFormatter={Timestamp}
            onShow={handleShow}
          />
        ))}
      </List>

      <OthersReviewActionSheet
        selectedReview={selectedReview}
        onReportReview={reportReview}
      />
    </>
  )
}
