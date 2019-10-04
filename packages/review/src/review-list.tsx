import React, { useState, useEffect, useMemo } from 'react'
import { List, MarginPadding } from '@titicaca/core-elements'
import {
  useReviewLikesContext,
  useHistoryContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import IntersectionObserver from '@titicaca/intersection-observer'
import ReviewElement from './review-element'
import { fetchMyReviews } from './review-api-clients'
import ReviewTimestamp from './review-timestamp'
import MyReviewActionSheet, {
  HASH_MY_REVIEW_ACTION_SHEET,
} from './my-review-action-sheet'
import OthersReviewActionSheet, {
  HASH_REVIEW_ACTION_SHEET,
} from './others-review-action-sheet'
import usePaging from './use-paging'

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
  const [myReview, setMyReview] = useState(undefined)
  const { isPublic } = useUserAgentContext()
  const {
    likes,
    actions: { like, unlike },
  } = useReviewLikesContext()
  const { push } = useHistoryContext()
  const { reviews, fetchNext } = usePaging({
    order: '',
    resourceId,
    resourceType,
    perPage: 20,
  })

  useEffect(() => {
    const fetchAndSetMyReview = async () => {
      try {
        const [fetchedMyReview] = await fetchMyReviews({
          resourceId,
          resourceType,
        })

        if (fetchedMyReview) {
          setMyReview(fetchedMyReview)
        }
      } catch (e) {
        // do nothing
      }
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

  return useMemo(
    () => (
      <>
        <List margin={margin} divided verticalGap={60}>
          {(myReview
            ? [
                myReview,
                ...(reviews || []).filter(({ id }) => id !== myReview.id),
              ]
            : reviews
          ).map((review, i) => (
            <IntersectionObserver
              key={review.id}
              onChange={({ isIntersecting }) => {
                if (isIntersecting && reviews.length - 3 < i) {
                  fetchNext()
                }
              }}
            >
              <div>
                <ReviewElement
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
              </div>
            </IntersectionObserver>
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
    ),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [resourceId, resourceType, reviews, myReview],
  )
}
