import React, { useState, useEffect } from 'react'
import { Confirm } from '@titicaca/modals'
import ActionSheet from '@titicaca/action-sheet'
import { List, MarginPadding } from '@titicaca/core-elements'
import {
  useReviewLikesContext,
  useMyReviewsContext,
  useHistoryContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import ReviewElement from './review-element'
import {
  fetchReviews,
  fetchMyReviews,
  deleteReview as deleteReviewApi,
} from './review-api-clients'
import ReviewTimestamp from './review-timestamp'

const HASH_MY_REVIEW_ACTION_SHEET = 'common.reviews-list.my-review-action-sheet'
const HASH_REVIEW_ACTION_SHEET = 'common.reviews-list.review-action-sheet'
const HASH_DELETION_MODAL = 'common.reviews-list.deletion-modal'

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
    actions: { deleteMyReview },
  } = useMyReviewsContext()
  const {
    likes,
    actions: { like, unlike },
  } = useReviewLikesContext()
  const { uriHash, push, back } = useHistoryContext()

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

  const handleEditMenuClick = () => {
    window.location.href = `${appUrlScheme}:////reviews/edit?region_id=${regionId}&resource_type=${resourceType}&resource_id=${resourceId}`
  }

  const handleDeleteMenuClick = () => {
    push(HASH_DELETION_MODAL)

    return true
  }

  const deleteReview = async () => {
    const response = await deleteReviewApi({ id: myReview.id })

    if (response.ok) {
      notifyReviewDeleted(resourceId, myReview.id)

      deleteMyReview({ id: myReview.id })

      setMyReview(null)
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

  const handleReportClick = () => {
    window.location.href = `${appUrlScheme}:///reviews/${selectedReview.id}/report`
  }

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

      <ActionSheet open={uriHash === HASH_REVIEW_ACTION_SHEET} onClose={back}>
        <ActionSheet.Item icon="report" onClick={handleReportClick}>
          신고하기
        </ActionSheet.Item>
      </ActionSheet>

      <ActionSheet
        open={uriHash === HASH_MY_REVIEW_ACTION_SHEET}
        onClose={back}
      >
        <ActionSheet.Item icon="review" onClick={handleEditMenuClick}>
          수정하기
        </ActionSheet.Item>
        <ActionSheet.Item icon="delete" onClick={handleDeleteMenuClick}>
          삭제하기
        </ActionSheet.Item>
      </ActionSheet>

      <Confirm
        open={uriHash === HASH_DELETION_MODAL}
        onClose={back}
        onConfirm={deleteReview}
      >
        삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
      </Confirm>
    </>
  )
}
