import React, { useCallback } from 'react'
import styled from 'styled-components'
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
  useUserAgentContext,
  useURIHash,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { TranslatedProperty } from '@titicaca/type-definitions'
import { formatNumber } from '@titicaca/view-utilities'

import { HASH_COPY_ACTION_SHEET } from './constants'
import CopyActionSheet from './copy-action-sheet'

const LongClickableSection = longClickable(Section)

interface Area {
  id: number
  name: string
}

export default function DetailHeader({
  names,
  areas,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onReviewsRatingClick,
  onCopy,
  ...props
}: {
  names: TranslatedProperty
  areas?: Area[]
  scrapsCount: number
  reviewsCount: number
  reviewsRating: number
  onReviewsRatingClick: () => void
  onCopy: (value: string) => void
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
        <AreaNames areas={areas} />
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

function AreaNames({ areas }: { areas?: Area[] }) {
  const names = (areas || []).map(({ name }) => name).join(' / ')
  return names ? (
    <AreaContainer>
      <Text size="tiny" bold margin={{ top: 10 }} alpha={0.8} lineHeight={1.38}>
        {names}
      </Text>
    </AreaContainer>
  ) : null
}

const AreaContainer = styled(Container)`
  padding-left: 20px;
  background-image: url('https://assets.triple.guide/images/ico-end-location@3x.png');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: left top;
`
