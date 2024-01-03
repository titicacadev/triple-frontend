import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import {
  Section,
  HR1,
  Button,
  MarginPadding,
  Tooltip,
  ButtonGroup,
} from '@titicaca/tds-ui'
import { useEffect, useRef } from 'react'
import { useLocalStorage } from '@titicaca/react-hooks'

const ActionButton = styled(Button)`
  position: relative;
  padding-left: 0;
  padding-right: 0;
`

const ReviewTooltip = styled(Tooltip)`
  width: max-content;
  padding: 9px 15px 8px;
  transform: translateX(-50%);
  left: 50%;

  &::after {
    transform: translateX(-50%);
    left: 50%;
  }
`

const REVIEW_TOOLTIP_EXPOSED = 'REVIEW_TOOLTIP_EXPOSED'

export function PoiDetailActions({
  scraped,
  reviewed,
  onScheduleAdd,
  onScrapedChange,
  onContentShare,
  onReviewEdit,
  noDivider = false,
  ...props
}: {
  poiId: string
  scraped: boolean
  reviewed: boolean
  onScheduleAdd?: () => void
  onScrapedChange?: () => void
  onContentShare: () => void
  onReviewEdit: () => void
  margin?: MarginPadding
  padding?: MarginPadding
  noDivider?: boolean
}) {
  const { t } = useTranslation('triple-frontend')

  const [isReviewTooltipExposed, setIsReviewTooltipExposed] = useLocalStorage(
    REVIEW_TOOLTIP_EXPOSED,
  )
  const isReviewTooltipExposedCopy = useRef(isReviewTooltipExposed)

  useEffect(() => {
    setIsReviewTooltipExposed('true')
  }, [setIsReviewTooltipExposed])

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
          >
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
          {isReviewTooltipExposedCopy.current !== 'true' ? (
            <ReviewTooltip
              label="이제 영상도 올릴 수 있어요!"
              pointing={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              nowrap={false}
              borderRadius="16.17"
              backgroundColor="var(--color-blue)"
              positioning={{ top: -26 }}
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
