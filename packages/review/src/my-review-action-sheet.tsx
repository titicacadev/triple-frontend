import React from 'react'
import ActionSheet from '@titicaca/action-sheet'
import { Confirm } from '@titicaca/modals'
import {
  useHistoryContext,
  useMyReviewsContext,
} from '@titicaca/react-contexts'
import { deleteReview as deleteReviewApi } from './review-api-clients'

export const HASH_MY_REVIEW_ACTION_SHEET =
  'common.reviews-list.my-review-action-sheet'

const HASH_DELETION_MODAL = 'common.reviews-list.deletion-modal'

export default function MyReviewActionSheet({
  myReview,
  appUrlScheme,
  regionId,
  resourceType,
  resourceId,
  notifyReviewDeleted,
  onReviewEdit,
  onReviewDelete,
}) {
  const { uriHash, replace, back } = useHistoryContext()
  const {
    actions: { deleteMyReview },
  } = useMyReviewsContext()

  const handleEditMenuClick = () => {
    window.location.href = `${appUrlScheme}:///reviews/edit?region_id=${regionId}&resource_type=${resourceType}&resource_id=${resourceId}`
  }

  const handleDeleteMenuClick = () => {
    replace(HASH_DELETION_MODAL)

    return true
  }

  const deleteReview = async () => {
    const response = await deleteReviewApi({ id: myReview.id })

    if (response.ok) {
      notifyReviewDeleted(resourceId, myReview.id)

      deleteMyReview({ id: myReview.id })
    }

    back()
  }

  return (
    <>
      <ActionSheet
        open={uriHash === HASH_MY_REVIEW_ACTION_SHEET}
        onClose={back}
      >
        <ActionSheet.Item
          icon="review"
          onClick={onReviewEdit || handleEditMenuClick}
        >
          수정하기
        </ActionSheet.Item>
        <ActionSheet.Item icon="delete" onClick={handleDeleteMenuClick}>
          삭제하기
        </ActionSheet.Item>
      </ActionSheet>

      <Confirm
        open={uriHash === HASH_DELETION_MODAL}
        onClose={back}
        onConfirm={(e) => onReviewDelete(e, myReview.id) || deleteReview}
      >
        삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
      </Confirm>
    </>
  )
}
