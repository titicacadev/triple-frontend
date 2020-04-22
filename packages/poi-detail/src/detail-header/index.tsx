import React, { useCallback } from 'react'
import {
  Section,
  Text,
  Container,
  Rating,
  Icon,
  longClickable,
} from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useHistoryContext,
} from '@titicaca/react-contexts'
import { TranslatedProperty } from '@titicaca/type-definitions'
import { formatNumber } from '@titicaca/view-utilities'

import { HASH_COPY_ACTION_SHEET } from './constants'
import CopyActionSheet from './copy-action-sheet'

export default function DetailHeader({
  names,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onReviewsRatingClick,
  onCopy,
  ...props
}: {
  names: TranslatedProperty
  scrapsCount: number
  reviewsCount: number
  reviewsRating: number
  onReviewsRatingClick: () => void
  onCopy: (value: string) => void
} & Parameters<typeof Section>['0']) {
  const LongClickableSection = longClickable(Section)
  const { uriHash, push, back } = useHistoryContext()
  const { trackEvent } = useEventTrackingContext()

  const handleLongClick = useCallback(() => {
    trackEvent({ fa: { action: '장소명_복사하기_노출' } })
    push(HASH_COPY_ACTION_SHEET)
  }, [push, trackEvent])

  return (
    <>
      <LongClickableSection onLongClick={handleLongClick} {...props}>
        <Text.Title>{names.primary || names.ko || names.en}</Text.Title>
        <Text size="tiny" alpha={0.5}>
          {names.local || names.en}
        </Text>
        {(reviewsCount > 0 || scrapsCount > 0) && (
          <Container margin={{ top: 4 }}>
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
