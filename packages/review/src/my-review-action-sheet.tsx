import React, { SyntheticEvent } from 'react'
import qs from 'qs'
import ActionSheet from '@titicaca/action-sheet'
import { Confirm } from '@titicaca/modals'
import {
  useMyReviewsContext,
  useURIHash,
  useHistoryFunctions,
} from '@titicaca/react-contexts'

import { deleteReview as deleteReviewApi } from './review-api-clients'
import { ResourceType, ReviewData, ReviewDeleteHandler } from './types'

interface MyReviewActionSheetProps {
  myReview: ReviewData
  appUrlScheme: string
  regionId?: string
  resourceType: ResourceType
  resourceId: string
  notifyReviewDeleted: (resourceId: string, reviewId: string) => void
  /**
   * @deprecated 리뷰 작성 함수를 자체 구현하면
   * 다양한 방어 로직을 중복 구현하게 됩니다.
   * 이 prop을 사용하지 말아주세요.
   */
  onReviewEdit?: (e?: SyntheticEvent) => void
  onReviewDelete?: ReviewDeleteHandler
}

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
}: MyReviewActionSheetProps) {
  const uriHash = useURIHash()
  const { replace, back } = useHistoryFunctions()
  const { deleteMyReview } = useMyReviewsContext()

  const handleEditMenuClick = () => {
    const params = qs.stringify({
      region_id: regionId,
      resource_type: resourceType,
      resource_id: resourceId,
    })
    window.location.href = `${appUrlScheme}:///reviews/edit?${params}`
  }

  const handleDeleteMenuClick = () => {
    replace(HASH_DELETION_MODAL)

    return true
  }

  const deleteReview = async () => {
    const response = await deleteReviewApi({ id: myReview.id })

    if (response.ok) {
      notifyReviewDeleted(resourceId, myReview.id)

      deleteMyReview({ id: myReview.id, resourceId, resourceType })
    }

    back()
  }

  return (
    <>
      <ActionSheet
        open={uriHash === HASH_MY_REVIEW_ACTION_SHEET}
        onClose={back}
      >
        {!myReview.blindedAt ? (
          <ActionSheet.Item
            icon="review"
            onClick={onReviewEdit || handleEditMenuClick}
          >
            수정하기
          </ActionSheet.Item>
        ) : null}
        <ActionSheet.Item icon="delete" onClick={handleDeleteMenuClick}>
          삭제하기
        </ActionSheet.Item>
      </ActionSheet>

      <Confirm
        open={uriHash === HASH_DELETION_MODAL}
        onClose={back}
        onConfirm={
          onReviewDelete ? (e) => onReviewDelete(e, myReview.id) : deleteReview
        }
      >
        삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
      </Confirm>
    </>
  )
}
