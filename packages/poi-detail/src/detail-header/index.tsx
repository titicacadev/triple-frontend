import React, { useCallback } from 'react'
import {
  Section,
  Container,
  longClickable,
  Text,
  Rating,
  Icon,
} from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useUserAgentContext,
  useURIHash,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { TranslatedProperty } from '@titicaca/type-definitions'
import { formatNumber } from '@titicaca/view-utilities'

import CopyActionSheet from '../copy-action-sheet'
import AreaNames from '../area-names'
import { HASH_COPY_ACTION_SHEET } from '../constants'

const LongClickableSection = longClickable(Section)

interface Area {
  id: number | string
  name: string
}

export default function DetailHeader({
  names,
  areas = [],
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onReviewsRatingClick,
  onCopy,
  vicinity,
  ...props
}: {
  names: TranslatedProperty
  areas?: Area[]
  scrapsCount: number
  reviewsCount: number
  reviewsRating: number
  onReviewsRatingClick: () => void
  onCopy: (value: string) => void
  vicinity?: string
} & Parameters<typeof Section>['0']) {
  const { isPublic } = useUserAgentContext()

  const uriHash = useURIHash()
  const { push, back } = useHistoryFunctions()
  const { trackEvent } = useEventTrackingContext()

  const handleLongClick = useCallback(() => {
    trackEvent({ fa: { action: '장소명_복사하기_노출' } })
    push(HASH_COPY_ACTION_SHEET)
  }, [push, trackEvent])

  return (
    <>
      <LongClickableSection
        onLongClick={!isPublic ? handleLongClick : undefined}
        {...props}
      >
        <Text.Title>{names.primary || names.ko || names.en}</Text.Title>
        <Text size="tiny" alpha={0.5}>
          {names.local || names.en}
        </Text>
        {(reviewsCount > 0 || scrapsCount > 0) && (
          <Container margin={{ top: 14 }}>
            {reviewsCount > 0 && (
              <Text
                inline
                bold
                size="mini"
                alpha={1}
                margin={{ right: 10 }}
                onClick={onReviewsRatingClick}
              >
                <Rating score={reviewsRating} />
                {` ${formatNumber(reviewsCount)}`}
              </Text>
            )}
            {scrapsCount > 0 && (
              <Text inline bold size="mini" alpha={1}>
                <Icon name="save" size="tiny" />
                {` ${formatNumber(scrapsCount)}`}
              </Text>
            )}
          </Container>
        )}
        <AreaNames areas={areas} vicinity={vicinity} />
      </LongClickableSection>
      <CopyActionSheet
        open={uriHash === HASH_COPY_ACTION_SHEET}
        names={names}
        onCopy={onCopy}
        onClose={back}
      />
    </>
  )
}
