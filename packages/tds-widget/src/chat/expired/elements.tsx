import styled, { css } from 'styled-components'
import { Container as BaseContainer } from '@titicaca/tds-ui'

import TalkIconBase from '../icons/talk-icon'

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
  color: ${({ theme }) => theme.nol.colorNeutralB100};
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.nol.colorNeutralB15};
  border-radius: 8px;
  font-size: 14px;
  line-height: 19px;
  background-color: ${({ theme }) => theme.nol.colorNeutralW100};

  ${ButtonIcon} {
    margin-right: 6px;
  }

  ${TalkIcon} {
    margin-right: 6px;
  }
`

export const Container = styled(BaseContainer)`
  background-color: #eff1fa;
  padding: 30px 26px 24px;
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
    color: ${({ theme }) => theme.nol.colorNeutralB100};
    margin-bottom: 4px;
  }

  ${Button} {
    margin-top: 12px;

    & + ${Button} {
      margin-top: 8px;
    }
  }
`
