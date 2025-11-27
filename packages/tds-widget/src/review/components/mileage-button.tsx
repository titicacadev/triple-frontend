import { Text } from '@titicaca/tds-ui'
import {
  useClientApp,
  useTrackEvent,
  useTranslation,
} from '@titicaca/triple-web'
import { styled } from 'styled-components'

import { useClientActions } from '../services'

const StyledButton = styled.button`
  position: relative;
  display: block;
  border-radius: 4px;
  background-color: rgba(58, 58, 58, 0.03);
  width: 100%;
  margin-top: 25px;
  padding: 22px 20px 19px;
  font-size: 13px;
  color: #2987f0;
  cursor: pointer;

  @media only screen and (max-width: 640px) {
    padding: 16px 14px 16px 20px;
  }
`

const BulletRight = styled.img.attrs({
  src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMjk4N0YwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS42IiBkPSJNNy4wNyAxNkwxMyAxMC4wMzUgNyA0Ii8+Cjwvc3ZnPgo=',
})`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media only screen and (max-width: 640px) {
    right: 9px;
  }
`

interface Props {
  resourceId: string
}

export function MileageButton({ resourceId }: Props) {
  const t = useTranslation()
  const trackEvent = useTrackEvent()
  const app = useClientApp()
  const { navigateMileageIntro } = useClientActions()

  return (
    <StyledButton
      onClick={(e) => {
        trackEvent({
          ga: ['리뷰_여행자클럽선택'],
          fa: {
            action: '리뷰_여행자클럽선택',
            item_id: resourceId,
          },
        })
        e.preventDefault()
        if (app) {
          navigateMileageIntro()
        } else {
          window.location.href = `/hybrid/mileage/intro`
        }
      }}
    >
      <Text color="gray" size="small" alpha={0.6} lineHeight={1.7}>
        {t('리뷰 쓰면 여행자 클럽 최대 3포인트!')}
      </Text>
      <Text color="blue" size="small" lineHeight={1.7}>
        {t('포인트별 혜택 보기')}
      </Text>
      <BulletRight alt={t('포인트별 혜택 보기')} />
    </StyledButton>
  )
}
