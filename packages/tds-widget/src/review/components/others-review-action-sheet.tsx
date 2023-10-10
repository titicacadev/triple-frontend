import { ActionSheet, ActionSheetItem } from '@titicaca/tds-ui'
import { useTranslation } from '@titicaca/next-i18next'
import { useUriHash, useHistoryFunctions } from '@titicaca/react-contexts'

import { useClientActions } from '../services'

export const HASH_REVIEW_ACTION_SHEET =
  'common.reviews-list.review-action-sheet'

export interface OthersReviewActionSheetProps {
  reviewId: string
}

export function OthersReviewActionSheet({
  reviewId,
}: OthersReviewActionSheetProps) {
  const { t } = useTranslation('common-web')

  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()
  const { reportReview } = useClientActions()

  const handleReportClick = () => {
    reportReview(reviewId)

    back()
  }

  return (
    <ActionSheet open={uriHash === HASH_REVIEW_ACTION_SHEET} onClose={back}>
      <ActionSheetItem icon="report" onClick={handleReportClick}>
        {t(['singohagi', '신고하기'])}
      </ActionSheetItem>
    </ActionSheet>
  )
}
