import styled, { css } from 'styled-components'
import { Color, getColor } from '@titicaca/color-palette'

import { ButtonBase, ButtonBaseProps } from './button-base'

const BASIC_INVERTED_COLORS: Partial<Record<Color, string>> = {
  blue: '#368fff',
  gray: '#3a3a3a',
}

export interface BasicButtonProps extends ButtonBaseProps {
  color?: Color
  compact?: boolean
  inverted?: boolean
}

export const BasicButton = styled(ButtonBase)<BasicButtonProps>`
  border: 1px solid rgba(${getColor('gray200')});
  border-radius: 4px;
  background-color: transparent;
  color: #3a3a3a;
  padding: ${({ compact }) => (compact ? '7px 12px' : '14px 12px')};

  ${({ inverted, color = 'blue' }) =>
    inverted &&
    css`
      border: 1px solid ${BASIC_INVERTED_COLORS[color]};
      background-color: ${BASIC_INVERTED_COLORS[color]};
      color: white;
    `}
`
