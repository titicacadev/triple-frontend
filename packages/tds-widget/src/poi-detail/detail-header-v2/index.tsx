import { useCallback } from 'react'
import {
  useTranslation,
  useTrackEvent,
  useHashRouter,
  useClientApp,
} from '@titicaca/triple-web'
import { styled } from 'styled-components'
import {
  Section,
  Container,
  longClickable,
  Text,
  Icon,
  Rating,
  TextTitle,
} from '@titicaca/tds-ui'
import { formatNumber } from '@titicaca/view-utilities'
import { TranslatedProperty } from '@titicaca/type-definitions'

import { CopyActionSheet } from '../copy-action-sheet'
import { AreaNames } from '../area-names'
import { HASH_COPY_ACTION_SHEET } from '../constants'

const ArrowButton = styled.button`
  display: inline-block;
  color: var(--color-blue);
  outline: 0;
  font-size: 12px;
  font-weight: bold;
  padding: 0 14px 0 6px;
  background-image: url('https://assets.triple.guide/images/ico-arrow-right-blue.png');
  background-size: 14px 14px;
  background-position: right center;
  background-repeat: no-repeat;
  height: 14px;
`

const LongClickableSection = longClickable(Section)

interface Area {
  id: number | string
  name: string
}

export function PoiDetailHeaderV2({
  names,
  areaName,
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
  areaName?: string
  /**
   * @deprecated areaName 으로 통합됩니다.
   */
  areas?: Area[]
  scrapsCount: number
  reviewsCount: number
  reviewsRating: number
  onReviewsRatingClick: () => void
  onAreaClick?: () => void
  onCopy: (value: string) => void
  /**
   * @deprecated areaName 으로 통합됩니다.
   */
  vicinity?: string
} & Parameters<typeof Section>['0']) {
  const t = useTranslation()

  const app = useClientApp()
  const { hasUriHash, addUriHash, removeUriHash } = useHashRouter()
  const trackEvent = useTrackEvent()

  const handleLongClick = useCallback(() => {
    trackEvent({ fa: { action: '장소명_복사하기_노출' } })
    addUriHash(HASH_COPY_ACTION_SHEET)
  }, [addUriHash, trackEvent])

  return (
    <>
      <LongClickableSection
        onLongClick={app ? handleLongClick : undefined}
        {...props}
      >
        <TextTitle margin={{ bottom: 6 }}>
          {names.primary || names.ko || names.en}
        </TextTitle>
        <Text size="tiny" alpha={0.5}>
          {names.local || names.en}
        </Text>
        {(reviewsRating || scrapsCount > 0 || reviewsCount > 0) && (
          <Container
            css={{
              margin: '14px 0 0',
            }}
          >
            {scrapsCount > 0 ? (
              <Text inline bold size="mini" alpha={1} margin={{ right: 10 }}>
                <Icon name="save" size="tiny" />
                {` ${formatNumber(scrapsCount)}`}
              </Text>
            ) : null}
            {reviewsRating > 0 ? (
              <Text inline bold size="mini" alpha={1}>
                <Rating score={reviewsRating} />
                {reviewsCount > 0 && ` ${formatNumber(reviewsCount)}`}
                <ArrowButton onClick={onReviewsRatingClick}>
                  {t('리뷰보기')}
                </ArrowButton>
              </Text>
            ) : reviewsCount > 0 ? (
              <Text inline bold size="mini" alpha={1}>
                <ArrowButton
                  onClick={onReviewsRatingClick}
                  style={{ paddingLeft: 0, marginLeft: '-4px' }}
                >
                  {t('리뷰보기')}
                </ArrowButton>
              </Text>
            ) : null}
          </Container>
        )}
        <AreaNames
          areaName={areaName}
          areas={areas}
          vicinity={vicinity}
          arrowAction={
            onAreaClick ? (
              <ArrowButton onClick={onAreaClick}>{t('지도보기')}</ArrowButton>
            ) : null
          }
        />
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
