import { useCallback } from 'react'
import {
  Section,
  longClickable,
  Text,
  Icon,
  TextTitle,
  FlexBox,
  RatingV2,
  Button,
} from '@titicaca/kint5-core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { TranslatedProperty } from '@titicaca/type-definitions'
import { formatNumber } from '@titicaca/view-utilities'

import CopyActionSheet from '../copy-action-sheet'
import AreaNames from '../area-names'
import { HASH_COPY_ACTION_SHEET } from '../constants'

import BusinessHoursNote from './business-hours-note'

const LongClickableSection = longClickable(Section)

interface Area {
  id: number | string
  name: string
}

function DetailHeader({
  names,
  areaName,
  areas = [],
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onReviewsRatingClick,
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
  const app = useTripleClientMetadata()
  const uriHash = useUriHash()
  const { push, back } = useHistoryFunctions()
  const { trackEvent } = useEventTrackingContext()

  const handleLongClick = useCallback(() => {
    trackEvent({ fa: { action: '장소명_복사하기_노출' } })
    push(HASH_COPY_ACTION_SHEET)
  }, [push, trackEvent])

  return (
    <>
      <LongClickableSection
        onLongClick={app ? handleLongClick : undefined}
        css={{ padding: '0 16px' }}
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
          <FlexBox
            flex
            css={{
              alignItems: 'center',
              margin: '10px 0 0',
            }}
          >
            {reviewsCount > 0 && (
              <Button
                css={{
                  background: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginRight: 8,
                }}
                onClick={onReviewsRatingClick}
              >
                <RatingV2 score={reviewsRating} />
                <Text css={{ fontSize: 13, fontWeight: 400, marginTop: 1 }}>
                  ({formatNumber(reviewsCount)})
                </Text>
              </Button>
            )}
            {scrapsCount > 0 && (
              <FlexBox flex css={{ alignItems: 'center', marginTop: 2 }}>
                <Icon name="save" size="tiny" />
                <Text
                  css={{
                    marginLeft: 2,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {formatNumber(scrapsCount)}
                </Text>
              </FlexBox>
            )}
          </FlexBox>
        )}
        <AreaNames areaName={areaName} areas={areas} vicinity={vicinity} />
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

export default DetailHeader
