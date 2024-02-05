import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  Section,
  HR1,
  Button,
  MarginPadding,
  ButtonGroup,
} from '@titicaca/core-elements'
import dynamic from 'next/dynamic'

const ReviewTooltip = dynamic(() => import('./review-tooltip'), {
  ssr: false,
})

const ActionButton = styled(Button)`
  position: relative;
  padding-left: 0;
  padding-right: 0;
`

function Actions({
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
  const { t } = useTranslation('common-web')

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
            {scraped
              ? t(['jeojangcwiso', '저장취소'])
              : t(['jeojanghagi', '저장하기'])}
          </ActionButton>
        ) : null}
        {onScheduleAdd ? (
          <ActionButton icon="schedule" onClick={onScheduleAdd}>
            {t(['iljeongcuga', '일정추가'])}
          </ActionButton>
        ) : null}
        <ActionButton
          icon={reviewed ? 'starFilled' : 'starEmpty'}
          onClick={onReviewEdit}
        >
          <ReviewTooltip />
          {reviewed
            ? t(['ribyusujeong', '리뷰수정'])
            : t(['ribyusseugi', '리뷰쓰기'])}
        </ActionButton>
        <ActionButton icon="share" onClick={onContentShare}>
          {t(['gongyuhagi', '공유하기'])}
        </ActionButton>
      </ButtonGroup>
      {!noDivider && <HR1 css={{ margin: '8px 0 0' }} />}
    </Section>
  )
}

export default Actions
