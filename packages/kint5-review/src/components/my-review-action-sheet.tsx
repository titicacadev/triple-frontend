import { ActionSheet, ActionSheetItem } from '@titicaca/kint5-action-sheet'
import { useTranslation } from '@titicaca/next-i18next'
import { Confirm } from '@titicaca/kint5-modals'
import {
  useHistoryFunctions,
  useUriHash,
  useEnv,
} from '@titicaca/react-contexts'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
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
  lang: string
}

export function MyReviewActionSheet({
  reviewId,
  reviewBlinded,
  resourceType,
  resourceId,
  regionId,
  lang,
}: MyReviewActionSheetProps) {
  const { t } = useTranslation('common-web')

  const { appUrlScheme } = useEnv()
  const uriHash = useUriHash()
  const { replace, back } = useHistoryFunctions()
  const { notifyReviewDeleted } = useTripleClientActions()

  const { mutate } = useDeleteReviewMutation({ lang })

  const handleDeleteMenuClick = () => {
    replace(HASH_DELETION_MODAL)

    return true
  }

  const handleDeleteReview = () => {
    mutate({ id: reviewId, resourceId })
    notifyReviewDeleted?.(resourceId, reviewId, resourceType)

    back()
  }

  const handleEditReview = () => {
    const params = qs.stringify({
      region_id: regionId,
      resource_type: resourceType,
      resource_id: resourceId,
      lang,
    })
    window.location.href = `${appUrlScheme}:///reviews/edit?${params}`
  }

  return (
    <>
      <ActionSheet
        open={uriHash === HASH_MY_REVIEW_ACTION_SHEET}
        onClose={back}
      >
        {!reviewBlinded ? (
          <ActionSheetItem icon="review" onClick={handleEditReview}>
            {t(['sujeonghagi', '수정하기'])}
          </ActionSheetItem>
        ) : null}
        <ActionSheetItem icon="delete" onClick={handleDeleteMenuClick}>
          {t(['sagjehagi', '삭제하기'])}
        </ActionSheetItem>
      </ActionSheet>

      <Confirm
        open={uriHash === HASH_DELETION_MODAL}
        onClose={back}
        onConfirm={handleDeleteReview}
      >
        {t([
          'sagjehagessseubnigga-sagjehamyeon-jeogribdoen-ribyu-pointeudo-hamgge-sarajibnida.',
          '삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.',
        ])}
      </Confirm>
    </>
  )
}
