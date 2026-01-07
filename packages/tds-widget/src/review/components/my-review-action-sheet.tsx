import { ActionSheet, ActionSheetItem, Confirm } from '@titicaca/tds-ui'
import { useTranslation, useEnv, useHashRouter } from '@titicaca/triple-web'
import qs from 'qs'

import { useDeleteReviewMutation } from '../services'

export const HASH_MY_REVIEW_ACTION_SHEET =
  'common.reviews-list.my-review-action-sheet'

const HASH_DELETION_MODAL = 'common.reviews-list.deletion-modal'

interface MyReviewActionSheetProps {
  reviewId: string
  reviewBlinded: boolean
  resourceType: string
  resourceId: string
  regionId: string | undefined
}

export function MyReviewActionSheet({
  reviewId,
  reviewBlinded,
  resourceType,
  resourceId,
  regionId,
}: MyReviewActionSheetProps) {
  const t = useTranslation()

  const { appUrlScheme } = useEnv()
  const { hasUriHash, addUriHash, removeUriHash } = useHashRouter()

  const { mutate } = useDeleteReviewMutation()

  const handleDeleteMenuClick = () => {
    addUriHash(HASH_DELETION_MODAL, 'replace')

    return true
  }

  const handleDeleteReview = () => {
    mutate({ id: reviewId, resourceId, resourceType })
    // eslint-disable-next-line no-console
    console.log('Review deleted')
    removeUriHash('replace')
  }

  const handleEditReview = () => {
    const params = qs.stringify({
      region_id: regionId,
      resource_type: resourceType,
      resource_id: resourceId,
    })
    window.location.href = `${appUrlScheme}:///reviews/edit?${params}`
  }

  return (
    <>
      <ActionSheet
        open={hasUriHash(HASH_MY_REVIEW_ACTION_SHEET)}
        onClose={() => removeUriHash('replace')}
      >
        {!reviewBlinded ? (
          <ActionSheetItem icon="review" onClick={handleEditReview}>
            {t('수정하기')}
          </ActionSheetItem>
        ) : null}
        <ActionSheetItem icon="delete" onClick={handleDeleteMenuClick}>
          {t('삭제하기')}
        </ActionSheetItem>
      </ActionSheet>

      <Confirm
        open={hasUriHash(HASH_DELETION_MODAL)}
        onClose={() => removeUriHash('replace')}
        onConfirm={() => {
          // eslint-disable-next-line no-console
          console.log('Delete review confirmed')
          // removeUriHash('replace')
          handleDeleteReview()
        }}
      >
        {t('삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.')}
      </Confirm>
    </>
  )
}
