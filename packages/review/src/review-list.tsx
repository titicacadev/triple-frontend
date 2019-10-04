import React, { useState, useEffect } from 'react'
import { List, MarginPadding } from '@titicaca/core-elements'
import {
  useReviewLikesContext,
  useHistoryContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import ReviewElement from './review-element'
import { fetchReviews, fetchMyReviews } from './review-api-clients'
import ReviewTimestamp from './review-timestamp'
import MyReviewActionSheet, {
  HASH_MY_REVIEW_ACTION_SHEET,
} from './my-review-action-sheet'
import OthersReviewActionSheet, {
  HASH_REVIEW_ACTION_SHEET,
} from './others-review-action-sheet'

export default function ReviewsList({
  appUrlScheme,
  margin,
  resourceType,
  resourceId,
  regionId,
  notifyReviewDeleted,
  showToast,
}: {
  appUrlScheme: string
  margin: MarginPadding
  resourceType: string
  resourceId: string
  regionId: string
  notifyReviewDeleted: Function
  showToast: Function
}) {
  const [selectedReview, setSelectedReview] = useState(undefined)
  const [reviews, setReviews] = useState([])
  const [myReview, setMyReview] = useState(undefined)
  const { isPublic } = useUserAgentContext()
  const {
    likes,
    actions: { like, unlike },
  } = useReviewLikesContext()
  const { push } = useHistoryContext()

  useEffect(() => {
    const fetchAndSetReviews = async () => {
      const newReviews = await fetchReviews({
        resourceId,
        resourceType,
      })

      setReviews((oldReviews) => [...oldReviews, ...newReviews])
    }

    fetchAndSetReviews()
  }, [resourceId, resourceType, setReviews])

  useEffect(() => {
    const fetchAndSetMyReview = async () => {
      const [fetchedMyReview] = await fetchMyReviews({
        resourceId,
        resourceType,
      })

      setMyReview(fetchedMyReview)
    }

    fetchAndSetMyReview()
  }, [resourceId, resourceType, setMyReview])

  const handleUserClick = (e, { user: { uid, unregister } }) => {
    if (unregister) {
      showToast('탈퇴한 사용자입니다.')
    } else {
      window.location.href = `${appUrlScheme}:///users/${uid}`
    }
  }

  const handleLikeButtonClick = (e, { id, liked }) =>
    liked ? unlike(resourceId, id) : like(resourceId, id)

  const handleLikesCountClick = (e, { id }) => {
    window.location.href = `${appUrlScheme}:///regions/${regionId}/${resourceType}/${resourceId}/reviews/${id}/thanks`
  }

  const handleMenuClick = (e, review) => {
    if (!isPublic) {
      if (myReview && review.id === myReview.id) {
        push(HASH_MY_REVIEW_ACTION_SHEET)
      } else {
        setSelectedReview(review)
        push(HASH_REVIEW_ACTION_SHEET)
      }
    }
  }

  const handleImageClick = (e, { media }) => {
    if (isPublic) {
      return
    }

    window.location.href = `${appUrlScheme}:///images?${media}`
  }

  const renderedReviews = myReview
    ? [myReview, ...(reviews || []).filter(({ id }) => id !== myReview.id)]
    : reviews

  return (
    <>
      <List margin={margin} divided verticalGap={60}>
        {(renderedReviews || []).map((review) => (
          <ReviewElement
            key={review.id}
            review={
              typeof (likes || {})[review.id] === 'boolean'
                ? {
                    ...review,
                    liked: likes[review.id],
                    likeCount:
                      review.liked === likes[review.id]
                        ? review.likeCount
                        : review.likeCount + (likes[review.id] ? 1 : -1),
                  }
                : review
            }
            onUserClick={handleUserClick}
            onLikeButtonClick={handleLikeButtonClick}
            onLikesCountClick={handleLikesCountClick}
            onMenuClick={handleMenuClick}
            onImageClick={handleImageClick}
            likeVisible={!isPublic}
            menuVisible={!isPublic}
            DateFormatter={ReviewTimestamp}
          />
        ))}
      </List>

      <MyReviewActionSheet
        myReview={myReview}
        appUrlScheme={appUrlScheme}
        regionId={regionId}
        resourceType={resourceType}
        resourceId={resourceId}
        notifyReviewDeleted={(resourceId, reviewId) => {
          notifyReviewDeleted(resourceId, reviewId)
          myReview && reviewId === myReview.id && setMyReview(null)
        }}
      />

      <OthersReviewActionSheet
        appUrlScheme={appUrlScheme}
        selectedReview={selectedReview}
      />
    </>
  )
}
