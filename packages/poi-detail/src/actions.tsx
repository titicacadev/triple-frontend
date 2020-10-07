import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Section, HR1, Button, MarginPadding } from '@titicaca/core-elements'
import { useI18n } from '@titicaca/i18n'
import { useScrapsContext } from '@titicaca/react-contexts'

const ActionButton = styled(Button)`
  padding-left: 0;
  padding-right: 0;
`

function ScrapButton({
  resource: { id, type, scraped },
}: {
  resource: { id: string; type: string; scraped?: boolean }
}) {
  const { scrape, unscrape, deriveCurrentStateAndCount } = useScrapsContext()
  const { t } = useI18n()

  const { scraped: actualScraped } = deriveCurrentStateAndCount({
    id,
    scraped,
  })

  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()

      actualScraped ? unscrape({ id, type }) : scrape({ id, type })
    },
    [actualScraped, unscrape, id, type, scrape],
  )

  return (
    <ActionButton
      icon={scraped ? 'saveFilled' : 'saveEmpty'}
      onClick={handleClick}
    >
      {scraped
        ? t('common:unscrap', '저장취소')
        : t('common:scrap', '저장하기')}
    </ActionButton>
  )
}

/**
 * TODO: Compound Component로 바꾸기
 */
export default function Actions({
  reviewed,
  onScheduleAdd,
  onContentShare,
  onReviewEdit,
  noDivider,
  scrapableResource,
  ...props
}: {
  reviewed: boolean
  onScheduleAdd?: () => void
  onContentShare: () => void
  onReviewEdit: () => void
  margin?: MarginPadding
  padding?: MarginPadding
  noDivider?: boolean
  scrapableResource?: { id: string; type: string; scraped?: boolean }
}) {
  const { t } = useI18n()

  return (
    <Section {...props}>
      <Button.Group
        horizontalGap={22}
        buttonCount={
          [
            onScheduleAdd,
            scrapableResource,
            onContentShare,
            onReviewEdit,
          ].filter(Boolean).length
        }
      >
        {scrapableResource ? (
          <ScrapButton resource={scrapableResource} />
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
