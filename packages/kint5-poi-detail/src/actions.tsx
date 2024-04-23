import { useMemo } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  Section,
  HR1,
  MarginPadding,
  FlexBox,
  Text,
} from '@titicaca/kint5-core-elements'
import {
  AppName,
  useTripleClientMetadata,
} from '@titicaca/react-triple-client-interfaces'

import { ActionButtonIcon } from './action-button-icon'

const ActionButton = styled.button`
  position: relative;
  width: 73px;
  flex: 0 0 73px;
`

const ActionButtonText = styled(Text)`
  color: var(--color-kint5-gray100);
  padding-top: 32px;
`

function Actions({
  scraped,
  reviewed,
  onScheduleAdd,
  onScrapedChange,
  onGetDirection,
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
  onGetDirection: () => void
  onContentShare: () => void
  onReviewEdit: () => void
  margin?: MarginPadding
  padding?: MarginPadding
  noDivider?: boolean
}) {
  const app = useTripleClientMetadata()
  const { t } = useTranslation('common-web')

  const isAndroid = app?.appName === AppName.Android
  const buttonTextFontSizePx = useMemo(() => (isAndroid ? 9 : 10), [isAndroid])

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
            <ActionButtonText css={{ fontSize: buttonTextFontSizePx }}>
              {scraped ? t(['jjim-cwiso', '찜 취소']) : t(['jjim', '찜'])}
            </ActionButtonText>
            <ActionButtonIcon type={scraped ? 'scraped' : 'notScraped'} />
          </ActionButton>
        ) : null}
        {onScheduleAdd ? (
          <ActionButton onClick={onScheduleAdd}>
            <ActionButtonText css={{ fontSize: buttonTextFontSizePx }}>
              {t(['iljeongcuga', '일정추가'])}
            </ActionButtonText>
            <ActionButtonIcon type="schedule" />
          </ActionButton>
        ) : null}
        <ActionButton onClick={onGetDirection}>
          <ActionButtonText css={{ fontSize: buttonTextFontSizePx }}>
            {t('길찾기')}
          </ActionButtonText>
          <ActionButtonIcon type="getDirections" />
        </ActionButton>
        <ActionButton onClick={onReviewEdit}>
          <ActionButtonText css={{ fontSize: buttonTextFontSizePx }}>
            {reviewed
              ? t(['ribyusujeong', '리뷰수정'])
              : t(['ribyusseugi', '리뷰쓰기'])}
          </ActionButtonText>
          <ActionButtonIcon type="review" />
        </ActionButton>
        <ActionButton onClick={onContentShare}>
          <ActionButtonText css={{ fontSize: buttonTextFontSizePx }}>
            {t(['gongyuhagi', '공유하기'])}
          </ActionButtonText>
          <ActionButtonIcon type="share" />
        </ActionButton>
      </FlexBox>
      {!noDivider && <HR1 css={{ margin: '8px 0 0' }} />}
    </Section>
  )
}

export default Actions
