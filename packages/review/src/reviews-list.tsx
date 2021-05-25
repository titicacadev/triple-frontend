import React, { useCallback, useState } from 'react'
import moment from 'moment'
import { List } from '@titicaca/core-elements'
import {
  useUserAgentContext,
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { TransitionType } from '@titicaca/modals'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { ImageMeta } from '@titicaca/type-definitions'
import semver from 'semver'

import ReviewElement, { ReviewElementProps } from './review-element'
import ReviewTimestamp from './review-timestamp'
import { HASH_MY_REVIEW_ACTION_SHEET } from './my-review-action-sheet'
import OthersReviewActionSheet, {
  HASH_REVIEW_ACTION_SHEET,
} from './others-review-action-sheet'
import { likeReview, unlikeReview } from './review-api-clients'
import { useReviewLikesContext } from './review-likes-context'
import { AppNativeActionProps, ReviewData } from './types'
import { useClientActions } from './use-client-actions'

const LOUNGE_APP_VERSION = '4.3.0'
export default function ReviewsList({
  myReview,
  reviews,
  regionId,
  fetchNext,
  appUrlScheme,
  resourceId,
  maxLength,
  reviewRateDescriptions,
  showToast,
}: {
  myReview?: ReviewData
  reviews: ReviewData[]
  fetchNext?: () => void
  regionId?: string
  /**
   * @deprecated env context를 사용하면 생략 가능
   */
  appUrlScheme?: string
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
  const { push } = useHistoryFunctions()
  const appVersion = semver.coerce(useUserAgentContext()?.app?.version)
  const {
    navigateUserDetail,
    navigateImages,
    navigateReviewDetail,
    reportReview,
  } = useClientActions({ appUrlScheme })

  const handleUserClick: ReviewElementProps['onUserClick'] = useSessionCallback(
    useCallback(
      (
        e: React.SyntheticEvent,
        { user: { uid, unregister, mileage } }: ReviewData,
      ) => {
        const { level } = mileage || { level: 0 }
        trackEvent({
          ga: ['리뷰 프로필'],
          fa: {
            action: '리뷰_프로필',
            item_id: resourceId,
            user_id: uid,
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

  const handleLikeButtonClick: ReviewElementProps['onLikeButtonClick'] = useSessionCallback(
    useCallback(
      async (
        e: React.SyntheticEvent,
        {
          id,
          liked,
        }: {
          id: string
          liked: boolean
        },
      ) => {
        const response = await (liked
          ? unlikeReview({ id })
          : likeReview({ id }))

        if (response.ok) {
          updateLikedStatus({ [id]: !liked }, resourceId)
        }
      },
      [updateLikedStatus, resourceId],
    ),
  )

  const handleMenuClick: ReviewElementProps['onMenuClick'] = useSessionCallback(
    useCallback(
      (e: React.SyntheticEvent, review: ReviewData) => {
        if (!isPublic) {
          if (myReview && review.id === myReview.id) {
            push(HASH_MY_REVIEW_ACTION_SHEET)
          } else {
            setSelectedReview(review)
            push(HASH_REVIEW_ACTION_SHEET)
          }
        }
      },
      [isPublic, myReview, push],
    ),
  )

  const handleImageClick: ReviewElementProps['onImageClick'] = useAppCallback(
    TransitionType.ReviewThumbnail,
    useSessionCallback(
      useCallback(
        (
          e: React.SyntheticEvent,
          { user: { name }, comment, media, createdAt }: ReviewData,
          image: ImageMeta,
          index,
        ) => {
          if (
            (appVersion && semver.gte(appVersion, LOUNGE_APP_VERSION)) ||
            !media
          ) {
            return
          }
          trackEvent({
            ga: ['리뷰_리뷰사진썸네일'],
            fa: {
              action: '리뷰_리뷰사진썸네일',
              item_id: resourceId,
              photo_id: media[index].id,
            },
          })

          const convertImage = (convertingImage: ImageMeta) => ({
            id: convertingImage.id,
            title: '',
            description: (comment || '').replace(/\n\s*\n/g, '\n'),
            width: convertingImage.width,
            height: convertingImage.height,
            sourceUrl: `${name} / ${moment(createdAt).format('YYYY.M.D')}`,
            sizes: {
              full: convertingImage.sizes.full,
              large: convertingImage.sizes.large,
              small_square:
                'smallSquare' in convertingImage.sizes
                  ? convertingImage.sizes.smallSquare
                  : convertingImage.sizes.small_square,
            },
          })

          if (!media) {
            return
          }

          navigateImages(
            media.map(convertImage),
            media.findIndex(({ id }) => id === image.id),
          )
        },
        [appVersion, navigateImages, resourceId, trackEvent],
      ),
    ),
  )

  const handleReviewClick = useCallback(
    (e: React.SyntheticEvent, reviewId) => {
      if (appVersion && semver.gte(appVersion, LOUNGE_APP_VERSION)) {
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
      }
    },
    [appVersion, trackEvent, resourceId, navigateReviewDetail, regionId],
  )

  const handleMessageCountClick = useCallback(
    (e: React.SyntheticEvent, reviewId, anchor) => {
      if (appVersion && semver.gte(appVersion, LOUNGE_APP_VERSION)) {
        e.preventDefault()
        e.stopPropagation()
        navigateReviewDetail({ reviewId, regionId, resourceId, anchor })
      }
    },
    [appVersion, resourceId, navigateReviewDetail, regionId],
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
            onUserClick={isPublic ? undefined : handleUserClick}
            onLikeButtonClick={handleLikeButtonClick}
            onMenuClick={handleMenuClick}
            onImageClick={handleImageClick}
            onReviewClick={handleReviewClick}
            onMessageCountClick={handleMessageCountClick}
            resourceId={resourceId}
            DateFormatter={ReviewTimestamp}
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
