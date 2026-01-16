import { ActionSheet, ActionSheetItem } from '@titicaca/tds-ui'
import { useTranslation, useHashRouter } from '@titicaca/triple-web'

import { useClientActions } from '../services'

export const HASH_REVIEW_ACTION_SHEET =
  'common.reviews-list.review-action-sheet'

export interface OthersReviewActionSheetProps {
  reviewId: string
}

export function OthersReviewActionSheet({
  reviewId,
}: OthersReviewActionSheetProps) {
  const t = useTranslation()

  const { hasUriHash, removeUriHash } = useHashRouter()
  const { reportReview } = useClientActions()

  const handleReportClick = () => {
    reportReview(reviewId)

    removeUriHash()
  }

  return (
    <ActionSheet
      open={hasUriHash(HASH_REVIEW_ACTION_SHEET)}
      onClose={removeUriHash}
    >
      <ActionSheetItem icon="report" onClick={handleReportClick}>
        {t('신고하기')}
      </ActionSheetItem>
    </ActionSheet>
  )
}
