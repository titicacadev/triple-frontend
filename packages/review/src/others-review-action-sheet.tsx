import React from 'react'
import ActionSheet from '@titicaca/action-sheet'
import {
  useURIHash,
  useHistoryFunctions,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { ExternalLink as OriginExternalLink } from '@titicaca/router'

import { ReviewData } from './types'
import styled from 'styled-components'

const ExternalLink = styled(OriginExternalLink)`
  color: black;
`

export const HASH_REVIEW_ACTION_SHEET =
  'common.reviews-list.review-action-sheet'

export default function OthersReviewActionSheet({
  selectedReview,
}: {
  selectedReview?: ReviewData | null
}) {
  const uriHash = useURIHash()
  const { isPublic } = useUserAgentContext()
  const { back } = useHistoryFunctions()

  return (
    <ActionSheet
      open={uriHash === HASH_REVIEW_ACTION_SHEET && !!selectedReview}
      onClose={back}
      zTier={3}
    >
      <ActionSheet.Item
        icon="report"
        onClick={() => {
          back()
        }}
      >
        <ExternalLink
          href={`/reviews/${selectedReview?.id}/report`}
          target={isPublic ? 'current' : 'new'}
          noNavbar
          allowSource="all"
        >
          <a>신고하기</a>
        </ExternalLink>
      </ActionSheet.Item>
    </ActionSheet>
  )
}
