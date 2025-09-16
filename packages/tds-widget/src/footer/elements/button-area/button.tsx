import { ReactNode } from 'react'
import { styled, css } from 'styled-components'
import { FlexBox } from '@titicaca/tds-ui'
import {
  useLogin,
  useLogout,
  useSessionAvailability,
  useTrackEvent,
} from '@titicaca/triple-web'

import { DESKTOP_MIN_WIDTH } from '../../utils/constants'
import { FooterLinkButton } from '../../utils/type'

export const ButtonContainer = styled(FlexBox)`
  flex-shrink: 1;
  gap: 6px;

  @media (max-width: ${DESKTOP_MIN_WIDTH - 1}px) {
    width: 100%;
  }
`

export const buttonFlexItemCss = css`
  flex-shrink: 0;

  @media (max-width: ${DESKTOP_MIN_WIDTH - 1}px) {
    flex-grow: 1;
    width: 50%;
  }
`

export const buttonCss = css`
  ${buttonFlexItemCss}
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: bold;
  line-height: 17px;
  color: #1b1c1f;
  text-align: center;
  border-radius: 12px;
  border: 1px solid #dadbdf;
  background: #fafbfd;

  span {
    margin: 0 4px;
  }

  img {
    width: 16px;
  }
`

export const Button = styled.a`
  ${buttonCss}
`

export const BUTTON_LIST: Record<string, ReactNode> = {
  login: <LoginLogoutButton key="login" />,
}

function LoginLogoutButton() {
  const sessionAvailable = useSessionAvailability()
  const login = useLogin()
  const logout = useLogout()
  const trackEvent = useTrackEvent()

  return (
    <Button
      as="button"
      type="button"
      onClick={() => {
        if (sessionAvailable) {
          logout()
          return
        }

        trackEvent({
          ga: ['푸터_로그인'],
          fa: {
            action: '푸터_로그인',
          },
        })
        login()
      }}
    >
      {sessionAvailable === true ? '로그아웃' : '로그인'}
    </Button>
  )
}

export function LinkButton({
  href,
  faEventAction,
  label,
  iconSrc,
}: FooterLinkButton) {
  const trackEvent = useTrackEvent()

  return (
    <Button
      href={href}
      onClick={() => {
        trackEvent({
          ga: [faEventAction],
          fa: {
            action: faEventAction,
          },
        })
      }}
    >
      <span>{label}</span>
      <img src={iconSrc} alt="link button arrow" />
    </Button>
  )
}
