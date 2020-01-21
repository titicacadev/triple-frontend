import React from 'react'
import ActionSheet from '@titicaca/action-sheet'
import { useHistoryContext } from '@titicaca/react-contexts'

export const HASH_REVIEW_ACTION_SHEET =
  'common.reviews-list.review-action-sheet'

export default function OthersReviewActionSheet({
  appUrlScheme,
  selectedReview,
}: {
  appUrlScheme: string
  selectedReview?: {
    id: string
  } | null
}) {
  const { uriHash, back } = useHistoryContext()

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
    >
      <ActionSheet.Item icon="report" onClick={handleReportClick}>
        신고하기
      </ActionSheet.Item>
    </ActionSheet>
  )
}
