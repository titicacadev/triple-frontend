import * as React from 'react'
import moment from 'moment-timezone'
import { Confirm } from '@titicaca/modals'
// import ActionSheet from '@titicaca/action-sheet'
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

// const HASH_MY_REVIEW_ACTION_SHEET = 'common.reviews-list.my-review-action-sheet'
// const HASH_REVIEW_ACTION_SHEET = 'common.reviews-list.review-action-sheet'
const HASH_DELETION_MODAL = 'common.reviews-list.deletion-modal'

class ReviewsList extends React.PureComponent<{
  isPublic: boolean
  appUrlScheme: string
  margin: MarginPadding
  reviews: any
  myReview: any
  resourceType: string
  regionId: string
  onMyReviewDeleted: any
  resourceId: string
  notifyReviewDeleted: any
  showToast: any
  likeActions?: any
  likes?: any
  myReviewActions?: any
  historyActions?: any
}> {
  state = { selectedReview: undefined }

  handleUserClick = (e, { user }) => {
    const { uid: userId, unregister } = user
    const {
      props: { isPublic, showToast, appUrlScheme },
    } = this
    if (!isPublic) {
      if (unregister) {
        showToast('탈퇴한 사용자입니다.')
      } else {
        window.location.href = `${appUrlScheme}:///users/${userId}`
      }
    }
  }

  handleLikeButtonClick = async (e, { id, liked }) => {
    const {
      props: {
        isPublic,
        resourceId,
        likeActions: { like, unlike },
      },
    } = this

    if (!isPublic) {
      liked ? await unlike(resourceId, id) : await like(resourceId, id)
    }
  }

  handleLikesCountClick = (e, { id }) => {
    const {
      props: { isPublic, regionId, resourceType, appUrlScheme, resourceId },
    } = this

    if (!isPublic) {
      //@TODO 졸아요 클릭
      window.location.href = `${appUrlScheme}:///regions/${regionId}/${resourceType}/${resourceId}/reviews/${id}/thanks`
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
        appUrlScheme,
        regionId,
        resourceType,
        resourceId,
      },
    } = this

    window.location.href = `${appUrlScheme}:////reviews/edit?region_id=${regionId}&resource_type=${resourceType}&resource_id=${resourceId}`
  }

  handleDeleteMenuClick = () => {
    // setPopup(HASH_DELETION_MODAL)

    return true
  }

  handleImageClick = (e, review) => {
    const {
      props: { isPublic, appUrlScheme },
    } = this
    const { attachments } = review

    if (isPublic) {
      return
    }

    window.location.href = `${appUrlScheme}:///images?${attachments}`
  }

  deleteReview = async () => {
    const {
      props: {
        notifyReviewDeleted,
        onMyReviewDeleted,
        myReview: { id: reviewId },
        myReviewActions: { deleteMyReview },
        resourceId,
      },
    } = this
    const response = await deleteReviewApi({ id: reviewId })

    if (response.ok) {
      notifyReviewDeleted(resourceId, reviewId)
      onMyReviewDeleted()

      deleteMyReview({ id: reviewId })
    }
  }

  handleReportClick = () => {
    const {
      props: { appUrlScheme },
      state: {
        selectedReview: { id },
      },
    } = this
    window.location.href = `${appUrlScheme}:///reviews/${id}/report`
  }

  render() {
    const {
      props: {
        likes,
        myReview,
        reviews,
        margin,
        isPublic,
        historyActions: { uriHash, back },
      },
    } = this
    const renderedReviews = myReview
      ? [myReview, ...(reviews || []).filter(({ id }) => id !== myReview.id)]
      : reviews || []
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

        {/*<ActionSheet*/}
        {/*  open={popup === HASH_REVIEW_ACTION_SHEET}*/}
        {/*  onClose={closePopup}*/}
        {/*>*/}
        {/*  <ActionSheet.Item icon="report" onClick={this.handleReportClick}>*/}
        {/*    신고하기*/}
        {/*  </ActionSheet.Item>*/}
        {/*</ActionSheet>*/}

        {/*<ActionSheet*/}
        {/*  open={popup === HASH_MY_REVIEW_ACTION_SHEET}*/}
        {/*  onClose={closePopup}*/}
        {/*>*/}
        {/*  <ActionSheet.Item icon="review" onClick={this.handleEditMenuClick}>*/}
        {/*    수정하기*/}
        {/*  </ActionSheet.Item>*/}
        {/*  <ActionSheet.Item icon="delete" onClick={this.handleDeleteMenuClick}>*/}
        {/*    삭제하기*/}
        {/*  </ActionSheet.Item>*/}
        {/*</ActionSheet>*/}

        <Confirm
          open={uriHash === HASH_DELETION_MODAL}
          onClose={back}
          onConfirm={this.deleteReview}
        >
          삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
        </Confirm>
      </>
    )
  }
}

export default withReviewLikes(withMyReviews(ReviewsList))
