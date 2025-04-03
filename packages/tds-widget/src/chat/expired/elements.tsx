import styled, { css } from 'styled-components'
import { Container as BaseContainer } from '@titicaca/tds-ui'

import TalkIconBase from '../icons/talk-icon'

import { expiredTheme } from './theme-provider'

const buttonIconCss = css`
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: text-top;
`

export const TalkIcon = styled(TalkIconBase)`
  ${buttonIconCss}
`

export const ButtonIcon = styled.div<{ src: string }>`
  ${buttonIconCss}

  background-image: url(${({ src }) => src});
  background-size: 16px 16px;
`

export const Button = styled.button.attrs({ type: 'button' })`
  padding: 8px 16px;
  color: ${({ theme }) => (theme.expired || expiredTheme).button.color};
  font-weight: 400;
  border: 1px solid
    ${({ theme }) => (theme.expired || expiredTheme).button.borderColor};
  border-radius: 8px;
  font-size: 14px;
  line-height: 19px;
  background-color: ${({ theme }) =>
    (theme.expired || expiredTheme).button.backgroundColor};

  ${ButtonIcon} {
    margin-right: 6px;
  }

  ${TalkIcon} {
    margin-right: 6px;
  }
`

export const Container = styled(BaseContainer)`
  background-color: ${({ theme }) =>
    (theme.expired || expiredTheme).backgroundColor};
  padding: 50px 26px 60px;
  font-size: 14px;
  line-height: 19px;
  align-items: center;
  text-align: center;
  color: #666;
  font-weight: 400;
  white-space: pre-line;

  h2 {
    font-size: 16px;
    line-height: 22px;
    font-weight: 700;
    color: ${({ theme }) => (theme.expired || expiredTheme).titleColor};
    margin-bottom: 6px;
  }

  ${Button} {
    margin-top: 16px;

    & + ${Button} {
      margin-top: 8px;
    }
  }
`
