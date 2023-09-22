import styled, { css } from 'styled-components'

type ButtonIconSize = 'tiny' | 'small'

const BUTTON_ICON_STYLES: Record<ButtonIconSize, ReturnType<typeof css>> = {
  tiny: css`
    width: 15px;
    height: 12px;
    background-size: 15px 12px;
    margin: 2px 5px 0 0;
  `,
  small: css`
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    margin: 0 3px 0 -3px;
  `,
}

export interface ButtonIconProps {
  size?: ButtonIconSize
  src?: string
}

export const ButtonIcon = styled.div<ButtonIconProps>`
  display: inline-block;
  ${({ size = 'tiny' }) => BUTTON_ICON_STYLES[size]};
  vertical-align: text-top;
  background-image: url(${({ src }) => src});
`
