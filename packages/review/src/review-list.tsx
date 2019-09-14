import * as React from 'react'
import moment from 'moment-timezone'
import { Confirm } from '@titicaca/modals'
import ActionSheet from '@titicaca/action-sheet'
import { MarginPadding } from '@titicaca/triple-design-system'
import ReviewsListView from './review-element'
import { withReviewLikes } from './review-likes-context'
import { withMyReviews } from './my-review-context'
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

class ReviewsList extends React.PureComponent<{
  isPublic: boolean
  APP_URL_SCHEME: string
  margin: MarginPadding
  reviews: any
  myReview: any
  resourceType: string
  regionId: string
  onMyReviewDeleted: any
  source: any
  notifyReviewDeleted: any
  showToast: any
  likeActions?: any
  likes?: any
  myReviewActions?: any
}> {
  state = { selectedReview: undefined }

  handleUserClick = (e, { user }) => {
    const { uid: userId, unregister } = user
    const {
      props: { isPublic, showToast, APP_URL_SCHEME },
    } = this
    if (!isPublic) {
      if (unregister) {
        showToast('탈퇴한 사용자입니다.')
      } else {
        window.location.href = `${APP_URL_SCHEME}:///users/${userId}`
      }
    }
  }

  handleLikeButtonClick = async (e, { id, liked }) => {
    const {
      props: {
        isPublic,
        source,
        likeActions: { like, unlike },
      },
    } = this
    const { contentId } = source

    if (!isPublic) {
      liked ? await unlike(contentId, id) : await like(contentId, id)
    }
  }

  handleLikesCountClick = (e, { id }) => {
    const {
      props: { isPublic, regionId, resourceType, APP_URL_SCHEME, source },
    } = this

    if (!isPublic) {
      //@TODO 졸아요 클릭
      window.location.href = `${APP_URL_SCHEME}:///regions/${regionId}/${resourceType}/${source.id}/reviews/${id}/thanks`
    }
  }

  handleMenuClick = (e, review) => {
    const {
      props: { isPublic, myReview },
    } = this
    if (!isPublic) {
      if (review.id === (myReview || {}).id) {
        // setPopup(HASH_MY_REVIEW_ACTION_SHEET)
      } else {
        this.setState({ selectedReview: review })
        // setPopup(HASH_REVIEW_ACTION_SHEET)
      }
    }
  }

  handleEditMenuClick = () => {
    const {
      props: {
        APP_URL_SCHEME,
        regionId,
        resourceType,
        myReview: { id },
      },
    } = this
    window.location.href = `${APP_URL_SCHEME}:////reviews/edit?region_id=${regionId}&resource_type=${resourceType}&resource_id=${id}`
  }

  handleDeleteMenuClick = () => {
    // setPopup(HASH_DELETION_MODAL)

    return true
  }

  handleImageClick = (e, review) => {
    const {
      props: { isPublic, APP_URL_SCHEME },
    } = this
    const { attachments } = review

    if (isPublic) {
      return
    }

    window.location.href = `${APP_URL_SCHEME}:///images?${attachments}`
  }

  deleteReview = async () => {
    const {
      props: {
        notifyReviewDeleted,
        onMyReviewDeleted,
        myReview: { id: reviewId },
        myReviewActions: { deleteMyReview },
        source: { id: sourceId },
      },
    } = this
    const response = await deleteReviewApi({ id: reviewId })

    if (response.ok) {
      notifyReviewDeleted(sourceId, reviewId)
      onMyReviewDeleted()

      deleteMyReview({ id: reviewId })
    }
  }

  handleReportClick = () => {
    const {
      props: { APP_URL_SCHEME },
      state: {
        selectedReview: { id },
      },
    } = this
    window.location.href = `${APP_URL_SCHEME}:///reviews/${id}/report`
  }

  render() {
    const {
      props: {likes, myReview, reviews, margin, isPublic },
    } = this
    const renderedReviews = myReview
      ? [myReview, ...(reviews || []).filter(({ id }) => id !== myReview.id)]
      : reviews || []
    const popup = undefined
    const closePopup = undefined
    return (
      <>
        <ReviewsListView
          margin={margin}
          reviews={renderedReviews}
          likes={likes}
          onUserClick={this.handleUserClick}
          onLikeButtonClick={this.handleLikeButtonClick}
          onLikesCountClick={this.handleLikesCountClick}
          onMenuClick={this.handleMenuClick}
          DateFormatter={ReviewTimestamp}
          menuVisible={!isPublic}
          likeVisible={!isPublic}
          onImageClick={this.handleImageClick}
        />

        <ActionSheet
          open={popup === HASH_REVIEW_ACTION_SHEET}
          onClose={closePopup}
        >
          <ActionSheet.Item icon="report" onClick={this.handleReportClick}>
            신고하기
          </ActionSheet.Item>
        </ActionSheet>

        <ActionSheet
          open={popup === HASH_MY_REVIEW_ACTION_SHEET}
          onClose={closePopup}
        >
          <ActionSheet.Item icon="review" onClick={this.handleEditMenuClick}>
            수정하기
          </ActionSheet.Item>
          <ActionSheet.Item icon="delete" onClick={this.handleDeleteMenuClick}>
            삭제하기a
          </ActionSheet.Item>
        </ActionSheet>

        <Confirm
          open={popup === HASH_DELETION_MODAL}
          onClose={closePopup}
          onConfirm={this.deleteReview}
        >
          삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
        </Confirm>
      </>
    )
  }
}

export default withReviewLikes(withMyReviews(ReviewsList))
