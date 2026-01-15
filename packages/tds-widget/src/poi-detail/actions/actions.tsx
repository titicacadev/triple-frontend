import { styled, css } from 'styled-components'
import {
  Section,
  HR1,
  Button,
  MarginPadding,
  ButtonGroup,
} from '@titicaca/tds-ui'
import { useEffect, useState } from 'react'
import {
  useClientAppActions,
  useTrackEvent,
  useTranslation,
} from '@titicaca/triple-web'

import Tooltip, { useLocalStorageTooltip } from './tooltip/tooltip'

const ActionButton = styled(Button)`
  position: relative;
  padding-left: 0;
  padding-right: 0;
`

export type TOOLTIP_TYPE = 'SCRAPE' | 'REVIEW'

const REVIEW_TOOLTIP_EXPOSED = 'REVIEW_TOOLTIP_EXPOSED'
const SCRAPE_TOOLTIP_EXPOSED = 'SCRAPE_TOOLTIP_EXPOSED'

export function PoiDetailActions({
  poiId,
  scraped,
  reviewed,
  onScheduleAdd,
  onScrapedChange,
  onContentShare,
  onReviewEdit,
  refetchReviewed,
  noDivider = false,
  tooltips = ['REVIEW'],
  ...props
}: {
  poiId: string
  scraped: boolean
  reviewed: boolean
  onScheduleAdd?: () => void
  onScrapedChange?: () => void
  onContentShare: () => void
  onReviewEdit: () => void
  refetchReviewed: () => void
  margin?: MarginPadding
  padding?: MarginPadding
  noDivider?: boolean
  tooltips?: Array<TOOLTIP_TYPE>
}) {
  const t = useTranslation()
  const trackEvent = useTrackEvent()

  const hasScrapeTooltip = tooltips.includes('SCRAPE')
  const hasReviewTooltip = tooltips.includes('REVIEW')

  const isReviewTooltipShownBefore = useLocalStorageTooltip(
    REVIEW_TOOLTIP_EXPOSED,
  )

  const [showScrapeTooltip, setShowScrapeTooltip] = useState(
    hasScrapeTooltip && !scraped,
  )

  const [showReviewTooltip, setShowReviewTooltip] = useState(false)

  useEffect(() => {
    setShowReviewTooltip(hasReviewTooltip && !isReviewTooltipShownBefore)
  }, [isReviewTooltipShownBefore, hasReviewTooltip])

  const { subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent } =
    useClientAppActions()

  useEffect(() => {
    subscribeReviewUpdateEvent?.(refetchReviewed)

    return () => unsubscribeReviewUpdateEvent?.(refetchReviewed)
  }, [
    refetchReviewed,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  return (
    <Section {...props}>
      <ButtonGroup
        horizontalGap={22}
        buttonCount={
          [onScheduleAdd, onScrapedChange, onContentShare, onReviewEdit].filter(
            Boolean,
          ).length
        }
      >
        {onScrapedChange ? (
          <ActionButton
            icon={scraped ? 'saveFilled' : 'saveEmpty'}
            onClick={onScrapedChange}
            css={{ transform: 'rotate(0deg)' }}
          >
            {showScrapeTooltip ? (
              <Tooltip
                localStorageKey={SCRAPE_TOOLTIP_EXPOSED}
                label="이 장소를 저장할 수 있어요!"
                position="bottom"
                onClick={(e) => {
                  e.stopPropagation()
                  trackEvent({
                    fa: {
                      action: '저장유도툴팁_닫기',
                    },
                  })
                  setShowScrapeTooltip(false)
                }}
                css={css`
                  transform: initial;
                  left: 0;

                  &::before {
                    position: fixed;
                    left: 50%;
                    top: initial;
                    bottom: 0;
                  }
                `}
              />
            ) : null}
            {scraped ? t('저장취소') : t('저장하기')}
          </ActionButton>
        ) : null}
        {onScheduleAdd ? (
          <ActionButton icon="schedule" onClick={onScheduleAdd}>
            {t('일정추가')}
          </ActionButton>
        ) : null}
        <ActionButton
          icon={reviewed ? 'starFilled' : 'starEmpty'}
          onClick={onReviewEdit}
        >
          {showReviewTooltip && !showScrapeTooltip ? (
            <Tooltip
              localStorageKey={REVIEW_TOOLTIP_EXPOSED}
              label="이제 영상도 올릴 수 있어요!"
              rule="once"
              onClick={(e) => {
                e.stopPropagation()
                setShowReviewTooltip(false)
              }}
            />
          ) : null}
          {reviewed ? t('리뷰수정') : t('리뷰쓰기')}
        </ActionButton>
        <ActionButton icon="share" onClick={onContentShare}>
          {t('공유하기')}
        </ActionButton>
      </ButtonGroup>
      {!noDivider && <HR1 css={{ margin: '8px 0 0' }} />}
    </Section>
  )
}
