import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  Section,
  HR1,
  MarginPadding,
  Tooltip,
  FlexBox,
  Text,
} from '@titicaca/kint5-core-elements'
import { useEffect, useState } from 'react'
import { getWebStorage } from '@titicaca/web-storage'

const ACTION_BUTTON_ICON_URLS = {
  saveEmpty:
    'https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-heart-line-24.svg',
  saveFilled: 'https://assets.triple.guide/images/btn-end-save-on@4x.png',
  starEmpty:
    'https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-bubble-line-24.svg',
  starFilled: 'https://assets.triple.guide/images/btn-end-review-on@4x.png',
  map: 'https://assets.triple.guide/images/btn-end-search-place@2x.png',
  share:
    'https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-share-line-24.svg',
  schedule:
    'https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-calendar-2-line-24.svg',
} as const

type IconType = keyof typeof ACTION_BUTTON_ICON_URLS

const ActionButton = styled.button<{ icon: IconType }>`
  position: relative;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-kint5-gray60);
  width: 45px;
  background-size: 24px;
  background-position: top center;
  background-repeat: no-repeat;
  background-image: ${({ icon }) => `url('${ACTION_BUTTON_ICON_URLS[icon]}')`};
`

const ActionButtonText = styled(Text)`
  color: var(--color-kint5-gray60);
  font-size: 13px;
  font-weight: 400;
  padding-top: 32px;
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

  const [isReviewTooltipExposed, setIsReviewTooltipExposed] = useState(true)

  useEffect(() => {
    const webStorage = getWebStorage('localStorage', { unavailable: () => {} })
    setIsReviewTooltipExposed(
      JSON.parse(
        webStorage.getItem(REVIEW_TOOLTIP_EXPOSED) || 'false',
      ) as boolean,
    )
    webStorage.setItem(REVIEW_TOOLTIP_EXPOSED, 'true')
  }, [])

  return (
    <Section {...props}>
      <FlexBox
        flex
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {onScrapedChange ? (
          <ActionButton
            icon={scraped ? 'saveFilled' : 'saveEmpty'}
            onClick={onScrapedChange}
          >
            <ActionButtonText>
              {scraped ? t(['jjim-cwiso', '찜 취소']) : t(['jjim', '찜'])}
            </ActionButtonText>
          </ActionButton>
        ) : null}
        {onScheduleAdd ? (
          <ActionButton icon="schedule" onClick={onScheduleAdd}>
            <ActionButtonText>
              {t(['iljeongcuga', '일정추가'])}
            </ActionButtonText>
          </ActionButton>
        ) : null}
        <ActionButton
          icon={reviewed ? 'starFilled' : 'starEmpty'}
          onClick={onReviewEdit}
        >
          {!isReviewTooltipExposed ? (
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
          <ActionButtonText>
            {reviewed
              ? t(['ribyusujeong', '리뷰수정'])
              : t(['ribyusseugi', '리뷰쓰기'])}
          </ActionButtonText>
        </ActionButton>
        <ActionButton icon="share" onClick={onContentShare}>
          <ActionButtonText>{t(['gongyuhagi', '공유하기'])}</ActionButtonText>
        </ActionButton>
      </FlexBox>
      {!noDivider && <HR1 css={{ margin: '8px 0 0' }} />}
    </Section>
  )
}

export default Actions
