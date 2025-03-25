import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { FlexBox } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useSessionAvailability,
  useSessionControllers,
} from '@titicaca/react-contexts'

import { MAX_PHONE_WIDTH } from '../constants'
import { FooterLinkButton } from '../type'

export const ButtonContainer = styled(FlexBox)`
  gap: 6px;

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

export const buttonCss = css`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  height: 32px;
  padding: 9px 12px;
  font-size: 11px;
  font-weight: bold;
  line-height: 13px;
  color: var(--color-gray600);
  text-align: center;
  border: 1px solid var(--color-gray200);
  border-radius: 4px;
  background-color: rgba(250, 250, 250, 1);

  img {
    width: 16px;
  }
`

export const Button = styled.a`
  ${buttonCss}
`

export const BUTTON_LIST: Record<string, ReactNode> = {
  login: <LoginLogoutButton />,
}

function LoginLogoutButton() {
  const sessionAvailable = useSessionAvailability()
  const { login, logout } = useSessionControllers()
  const { trackEvent } = useEventTrackingContext()

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
  const { trackEvent } = useEventTrackingContext()

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
