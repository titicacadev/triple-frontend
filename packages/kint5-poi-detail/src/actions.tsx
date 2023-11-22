import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  Section,
  HR1,
  MarginPadding,
  FlexBox,
  Text,
} from '@titicaca/kint5-core-elements'

import { ActionButtonIcon } from './action-button-icon'

const ActionButton = styled.button`
  position: relative;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-kint5-gray60);
  width: 74px;
`

const ActionButtonText = styled(Text)`
  color: var(--color-kint5-gray100);
  font-size: 12px;
  font-weight: 400;
  padding-top: 32px;
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
      <FlexBox
        flex
        css={{
          alignItems: 'flex-start',
          justifyContent: 'space-evenly',
        }}
      >
        {onScrapedChange ? (
          <ActionButton onClick={onScrapedChange}>
            <ActionButtonText>
              {scraped ? t(['jjim-cwiso', '찜 취소']) : t(['jjim', '찜'])}
            </ActionButtonText>
            <ActionButtonIcon type={scraped ? 'scraped' : 'notScraped'} />
          </ActionButton>
        ) : null}
        {onScheduleAdd ? (
          <ActionButton onClick={onScheduleAdd}>
            <ActionButtonText>
              {t(['iljeongcuga', '일정추가'])}
            </ActionButtonText>
            <ActionButtonIcon type="schedule" />
          </ActionButton>
        ) : null}
        <ActionButton onClick={onReviewEdit}>
          <ActionButtonText>
            {reviewed
              ? t(['ribyusujeong', '리뷰수정'])
              : t(['ribyusseugi', '리뷰쓰기'])}
          </ActionButtonText>
          <ActionButtonIcon type="review" />
        </ActionButton>
        <ActionButton onClick={onContentShare}>
          <ActionButtonText>{t(['gongyuhagi', '공유하기'])}</ActionButtonText>
          <ActionButtonIcon type="share" />
        </ActionButton>
      </FlexBox>
      {!noDivider && <HR1 css={{ margin: '8px 0 0' }} />}
    </Section>
  )
}

export default Actions