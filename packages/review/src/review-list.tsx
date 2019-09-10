import * as React from 'react'
import moment from 'moment-timezone'
import { Confirm } from '@titicaca/modals'
import ActionSheet from '@titicaca/action-sheet'
import ReviewsListView from './review-element'
import { useReviewContext } from './review-context'
import { deleteReview as deleteReviewApi } from './review-api-clients'
moment.updateLocale('ko', {
  relativeTime: {
    s: '방금',
  },
})
moment.relativeTimeRounding(Math.floor)
moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('m', 60)
moment.relativeTimeThreshold('h', 24)
moment.locale('ko')

function ReviewTimestamp({ children }) {
  const createdAt = moment(children)

  if (
    moment()
      .subtract(1, 'minute')
      .isBefore(createdAt)
  ) {
    return createdAt.fromNow(true)
  } else if (
    moment()
      .subtract(1, 'week')
      .isBefore(createdAt)
  ) {
    return createdAt.fromNow()
  }

  return createdAt.format('YYYY.M.D')
}

const HASH_MY_REVIEW_ACTION_SHEET = 'common.reviews-list.my-review-action-sheet'
const HASH_REVIEW_ACTION_SHEET = 'common.reviews-list.review-action-sheet'
const HASH_DELETION_MODAL = 'common.reviews-list.deletion-modal'

export function ReviewsList({
  isPublic,
  APP_URL_SCHEME,
  margin,
  reviews,
  myReview,
  resourceType,
  regionId,
  onMyReviewDeleted,
  source,
  notifyReviewDeleted,
  showToast,
}: {
  isPublic: boolean
  APP_URL_SCHEME: string
  margin: any
  reviews: any
  myReview: any
  resourceType: string
  regionId: string
  onMyReviewDeleted: any
  source: any
  notifyReviewDeleted: any
  showToast: any
}) {
  const [selectedReview, setSelectedReview] = React.useState(undefined)
  const { like, unlike, popup, setPopup, reviewLikes }: any = useReviewContext()
  const handleUserClick = (e, { user }) => {
    const { uid: userId, unregister } = user
    if (!isPublic) {
      if (unregister) {
        showToast('탈퇴한 사용자입니다.')
      } else {
        window.location.href = `${APP_URL_SCHEME}:///users/${userId}`
      }
    }
  }

  const handleLikeButtonClick = async (e, { id, liked }) => {
    const { contentId } = source
    if (!isPublic) {
      liked ? await unlike(contentId, id) : await like(contentId, id)
    }
  }

  const handleLikesCountClick = (e, { id }) => {
    if (!isPublic) {
      //@TODO 졸아요 클릭
      window.location.href = `${APP_URL_SCHEME}:///regions/${regionId}/${resourceType}/${source.id}/reviews/${id}/thanks`
    }
  }

  const handleMenuClick = (e, review) => {
    if (!isPublic) {
      if (review.id === (myReview || {}).id) {
        setPopup(HASH_MY_REVIEW_ACTION_SHEET)
      } else {
        setSelectedReview(review)
        setPopup(HASH_REVIEW_ACTION_SHEET)
      }
    }
  }

  const handleEditMenuClick = () => {
    window.location.href = `${APP_URL_SCHEME}:////reviews/edit?region_id=${regionId}&resource_type=${resourceType}&resource_id=${myReview.id}`
  }

  const handleDeleteMenuClick = () => {
    setPopup(HASH_DELETION_MODAL)

    return true
  }

  const handleImageClick = (e, review) => {
    const {
      props: { isPublic, APP_URL_SCHEME },
    } = this
    const { attachments } = review

    if (isPublic) {
      return
    }

    window.location.href = `${APP_URL_SCHEME}:///images?${attachments}`
  }

  const deleteReview = async () => {
    const { deleteMyReview }: any = useReviewContext()
    const reviewId = myReview.id
    const sourceId = source.id
    const response = await deleteReviewApi({ id: reviewId })

    if (response.ok) {
      notifyReviewDeleted(sourceId, reviewId)
      onMyReviewDeleted()

      deleteMyReview({ id: reviewId })
    }
  }

  const handleReportClick = () => {
    window.location.href = `${APP_URL_SCHEME}:///reviews/${selectedReview.id}/report`
  }

  const closePopup = () => setPopup(undefined)

  const renderedReviews = myReview
    ? [myReview, ...(reviews || []).filter(({ id }) => id !== myReview.id)]
    : reviews || []

  return (
    <>
      <ReviewsListView
        margin={margin}
        reviews={renderedReviews}
        likes={reviewLikes}
        onUserClick={handleUserClick}
        onLikeButtonClick={handleLikeButtonClick}
        onLikesCountClick={handleLikesCountClick}
        onMenuClick={handleMenuClick}
        DateFormatter={ReviewTimestamp}
        menuVisible={!isPublic}
        likeVisible={!isPublic}
        onImageClick={handleImageClick}
      />

      <ActionSheet
        open={popup === HASH_REVIEW_ACTION_SHEET}
        onClose={closePopup}
      >
        <ActionSheet.Item icon="report" onClick={handleReportClick}>
          신고하기
        </ActionSheet.Item>
      </ActionSheet>

      <ActionSheet
        open={popup === HASH_MY_REVIEW_ACTION_SHEET}
        onClose={closePopup}
      >
        <ActionSheet.Item icon="review" onClick={handleEditMenuClick}>
          수정하기
        </ActionSheet.Item>
        <ActionSheet.Item icon="delete" onClick={handleDeleteMenuClick}>
          삭제하기
        </ActionSheet.Item>
      </ActionSheet>

      <Confirm
        open={popup === HASH_DELETION_MODAL}
        onClose={closePopup}
        onConfirm={deleteReview}
      >
        삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
      </Confirm>
    </>
  )
}
