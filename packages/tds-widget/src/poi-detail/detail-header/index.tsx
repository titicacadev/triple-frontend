import { useCallback, useEffect } from 'react'
import {
  Section,
  Container,
  longClickable,
  Text,
  Rating,
  Icon,
  TextTitle,
} from '@titicaca/tds-ui'
import {
  useTrackEvent,
  useHashRouter,
  useClientApp,
  useClientAppActions,
} from '@titicaca/triple-web'
import { TranslatedProperty } from '@titicaca/type-definitions'
import { formatNumber } from '@titicaca/view-utilities'

import { CopyActionSheet } from '../copy-action-sheet'
import { AreaNames } from '../area-names'
import { HASH_COPY_ACTION_SHEET } from '../constants'

import { BusinessHoursNote } from './business-hours-note'

const LongClickableSection = longClickable(Section)

interface Area {
  id: number | string
  name: string
}

export function PoiDetailHeader({
  names,
  areaName,
  areas = [],
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onReviewsRatingClick,
  refetchReviewData,
  onCopy,
  vicinity,
  currentBusinessHours,
  todayBusinessHours,
  permanentlyClosed,
  onBusinessHoursClick,
  ...props
}: {
  names: TranslatedProperty
  areaName?: string
  /**
   * @deprecated areaName 으로 통합됩니다.
   */
  areas?: Area[]
  scrapsCount: number
  reviewsCount: number
  reviewsRating: number
  onReviewsRatingClick: () => void
  refetchReviewData: () => void
  onCopy: (value: string) => void
  /**
   * @deprecated areaName 으로 통합됩니다.
   */
  vicinity?: string
  currentBusinessHours?: null | { from: number; to: number; dayOfWeek: number }
  todayBusinessHours?: string
  permanentlyClosed?: boolean
  onBusinessHoursClick?: () => void
} & Parameters<typeof Section>['0']) {
  const app = useClientApp()
  const { hasUriHash, addUriHash, removeUriHash } = useHashRouter()
  const trackEvent = useTrackEvent()

  const { subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent } =
    useClientAppActions()

  const handleLongClick = useCallback(() => {
    trackEvent({ fa: { action: '장소명_복사하기_노출' } })
    addUriHash(HASH_COPY_ACTION_SHEET)
  }, [addUriHash, trackEvent])

  useEffect(() => {
    subscribeReviewUpdateEvent?.(refetchReviewData)
    return () => {
      unsubscribeReviewUpdateEvent?.(refetchReviewData)
    }
  }, [
    refetchReviewData,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  return (
    <>
      <LongClickableSection
        onLongClick={app ? handleLongClick : undefined}
        {...props}
      >
        <TextTitle>{names.primary || names.ko || names.en}</TextTitle>
        <Text size="tiny" alpha={0.5}>
          {names.local || names.en}
        </Text>

        {!permanentlyClosed && onBusinessHoursClick && !currentBusinessHours ? (
          <BusinessHoursNote
            todayBusinessHours={todayBusinessHours}
            onClick={onBusinessHoursClick}
          />
        ) : null}

        {(reviewsCount > 0 || scrapsCount > 0) && (
          <Container
            css={{
              margin: '10px 0 0',
            }}
          >
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
        <AreaNames areaName={areaName} areas={areas} vicinity={vicinity} />
      </LongClickableSection>
      <CopyActionSheet
        open={hasUriHash(HASH_COPY_ACTION_SHEET)}
        names={names}
        onCopy={onCopy}
        onClose={removeUriHash}
      />
    </>
  )
}
