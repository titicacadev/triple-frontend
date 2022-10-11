import styled from 'styled-components'
import { Section, HR1, Button, MarginPadding } from '@titicaca/core-elements'
import { useI18n } from '@titicaca/i18n'

const ActionButton = styled(Button)`
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
  const { t } = useI18n()

  return (
    <Section {...props}>
      <Button.Group
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
              ? t('common:unscrap', '저장취소')
              : t('common:scrap', '저장하기')}
          </ActionButton>
        ) : null}
        {onScheduleAdd ? (
          <ActionButton icon="schedule" onClick={onScheduleAdd}>
            {t('common:addSchedule', '일정추가')}
          </ActionButton>
        ) : null}
        <ActionButton
          icon={reviewed ? 'starFilled' : 'starEmpty'}
          onClick={onReviewEdit}
        >
          {reviewed
            ? t('common:modReview', '리뷰수정')
            : t('common:addReview', '리뷰쓰기')}
        </ActionButton>
        <ActionButton icon="share" onClick={onContentShare}>
          {t('common:share', '공유하기')}
        </ActionButton>
      </Button.Group>
      {!noDivider && <HR1 margin={{ top: 8, bottom: 0 }} />}
    </Section>
  )
}

export default Actions
