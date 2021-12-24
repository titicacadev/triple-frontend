import React from 'react'
import ActionSheet from '@titicaca/action-sheet'
import {
  useURIHash,
  useHistoryFunctions,
  useEnv,
} from '@titicaca/react-contexts'
import { ExternalLink } from '@titicaca/router'

import { ReviewData } from './types'
import { generateUrl } from '@titicaca/view-utilities'
import { ActionItem } from './my-review-action-sheet'

export const HASH_REVIEW_ACTION_SHEET =
  'common.reviews-list.review-action-sheet'

export default function OthersReviewActionSheet({
  selectedReview,
}: {
  selectedReview?: ReviewData | null
}) {
  const uriHash = useURIHash()
  const { appUrlScheme } = useEnv()

  const { back } = useHistoryFunctions()

  return (
    <ActionSheet
      open={uriHash === HASH_REVIEW_ACTION_SHEET && !!selectedReview}
      onClose={back}
      zTier={3}
    >
      <ActionItem
        icon="report"
        onClick={() => {
          back()
        }}
      >
        <ExternalLink
          href={generateUrl({
            scheme: appUrlScheme,
            path: `/reviews/${selectedReview?.id}/report`,
          })}
          target="new"
          noNavbar
          allowSource="app"
        >
          <a>신고하기</a>
        </ExternalLink>
      </ActionItem>
    </ActionSheet>
  )
}
