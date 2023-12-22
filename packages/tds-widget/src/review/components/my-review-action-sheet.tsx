import { ActionSheet, ActionSheetItem, Confirm } from '@titicaca/tds-ui'
import { useTranslation } from 'react-i18next'
import {
  useClientAppActions,
  useEnv,
  useHashRouter,
} from '@titicaca/triple-web'
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
  const { t } = useTranslation('triple-frontend')

  const { appUrlScheme } = useEnv()
  const { uriHash, addUriHash, removeUriHash } = useHashRouter()
  const { notifyReviewDeleted } = useClientAppActions()

  const { mutate } = useDeleteReviewMutation()

  const handleDeleteMenuClick = () => {
    addUriHash(HASH_DELETION_MODAL, 'replace')

    return true
  }

  const handleDeleteReview = () => {
    mutate({ id: reviewId, resourceId })
    notifyReviewDeleted?.(resourceId, reviewId, resourceType)

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
        open={uriHash === HASH_MY_REVIEW_ACTION_SHEET}
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
        open={uriHash === HASH_DELETION_MODAL}
        onClose={() => removeUriHash('replace')}
        onConfirm={handleDeleteReview}
      >
        {t('삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.')}
      </Confirm>
    </>
  )
}
