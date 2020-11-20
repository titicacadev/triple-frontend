import React from 'react'
import ActionSheet from '@titicaca/action-sheet'
import { useURIHash, useHistoryFunctions } from '@titicaca/react-contexts'

import { ReviewData } from './types'

export const HASH_REVIEW_ACTION_SHEET =
  'common.reviews-list.review-action-sheet'

export default function OthersReviewActionSheet({
  appUrlScheme,
  selectedReview,
}: {
  appUrlScheme: string
  selectedReview?: ReviewData | null
}) {
  const uriHash = useURIHash()
  const { back } = useHistoryFunctions()

  const handleReportClick = () => {
    if (!selectedReview) {
      return
    }

    window.location.href = `${appUrlScheme}:///reviews/${selectedReview.id}/report`

    back()
  }

  return (
    <ActionSheet
      open={uriHash === HASH_REVIEW_ACTION_SHEET && !!selectedReview}
      onClose={back}
      zTier={3}
    >
      <ActionSheet.Item icon="report" onClick={handleReportClick}>
        신고하기
      </ActionSheet.Item>
    </ActionSheet>
  )
}
