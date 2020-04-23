import React, { useState } from 'react'
import qs from 'qs'
import moment from 'moment'
import { List, MarginPadding } from '@titicaca/core-elements'
import {
  useHistoryContext,
  useUserAgentContext,
  useEventTrackingContext,
} from '@titicaca/react-contexts'
import { useTransitionModal, TransitionType } from '@titicaca/modals'

import ReviewElement, { ReviewElementProps } from './review-element'
import ReviewTimestamp from './review-timestamp'
import { HASH_MY_REVIEW_ACTION_SHEET } from './my-review-action-sheet'
import OthersReviewActionSheet, {
  HASH_REVIEW_ACTION_SHEET,
} from './others-review-action-sheet'
import { likeReview, unlikeReview } from './review-api-clients'
import { useReviewLikesContext } from './review-likes-context'
import { AppNativeActionProps, ReviewData, ImageEntity } from './types'

export default function ReviewsList({
  myReview,
  reviews,
  regionId,
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
  regionId: string
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
  const { show } = useTransitionModal()

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

  const handleImageClick: ReviewElementProps['onImageClick'] = (
    e,
    { user: { name }, comment, media, createdAt },
    image,
  ) => {
    if (isPublic) {
      return show(TransitionType.ReviewThumbnail)
    }

    const convertImage = (convertingImage: ImageEntity) => ({
      id: convertingImage.id,
      title: '',
      description: (comment || '').replace(/\n\s*\n/g, '\n'),
      width: convertingImage.width,
      height: convertingImage.height,
      sourceUrl: `${name} / ${moment(createdAt).format('YYYY.M.D')}`,
      sizes: {
        full: convertingImage.sizes.full,
        large: convertingImage.sizes.large,
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        small_square: convertingImage.sizes.smallSquare,
      },
    })

    if (!media) {
      return
    }

    window.location.href = `${appUrlScheme}:///images?${qs.stringify({
      images: JSON.stringify(media.map(convertImage)),
      index: media.findIndex(({ id }) => id === image.id),
    })}`
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
      <List margin={margin} divided verticalGap={20}>
        {displayedReviews.map((review, i) => (
          <ReviewElement
            isMyReview={!!(myReview && myReview.id === review.id)}
            key={review.id}
            index={i}
            regionId={regionId}
            appUrlScheme={appUrlScheme}
            review={review}
            reviewRateDescriptions={reviewRateDescriptions}
            onUserClick={handleUserClick}
            onLikeButtonClick={handleLikeButtonClick}
            onMenuClick={handleMenuClick}
            onImageClick={handleImageClick}
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
