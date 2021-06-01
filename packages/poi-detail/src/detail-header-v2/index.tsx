import React, { useCallback } from 'react'
import { Section, Container, longClickable } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useUserAgentContext,
  useURIHash,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { TranslatedProperty } from '@titicaca/type-definitions'

import CopyActionSheet from '../common/copy-action-sheet'
import AreaNames from '../common/area-names'
import { HASH_COPY_ACTION_SHEET } from '../common/constants'
import {
  DetailHeaderTitle,
  DetailHeaderLocalText,
  DetailHeadterReviewCount,
  DetailHeaderScrapCount,
} from '../common/detail-header-text'
import { PoiVersion } from '../common/types'

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
  onAreaClick,
  vicinity,
  ...props
}: {
  names: TranslatedProperty
  areas?: Area[]
  scrapsCount: number
  reviewsCount: number
  reviewsRating: number
  onReviewsRatingClick: () => void
  onAreaClick?: () => void
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
        <DetailHeaderTitle title={names.primary || names.ko || names.en} />
        <DetailHeaderLocalText text={names.local || names.en} />
        {(reviewsCount > 0 || scrapsCount > 0) && (
          <Container margin={{ top: 14 }}>
            {scrapsCount > 0 && (
              <DetailHeaderScrapCount
                margin={{ right: 10 }}
                count={scrapsCount}
              />
            )}
            {reviewsCount > 0 && (
              <DetailHeadterReviewCount
                count={reviewsCount}
                rating={reviewsRating}
                margin={undefined}
                onClick={onReviewsRatingClick}
              />
            )}
          </Container>
        )}
        <AreaNames
          version={PoiVersion.V2}
          areas={areas}
          vicinity={vicinity}
          onClick={onAreaClick}
        />
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
