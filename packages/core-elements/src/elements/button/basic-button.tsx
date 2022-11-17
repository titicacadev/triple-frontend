import { css } from 'styled-components'
import { Color, getColor } from '@titicaca/color-palette'

import { buttonBaseMixin, ButtonBaseProps } from './button-base'

const BASIC_INVERTED_COLORS: Partial<Record<Color, string>> = {
  blue: '#368fff',
  gray: '#3a3a3a',
}

export interface BasicButtonProps extends ButtonBaseProps {
  color?: Color
  compact?: boolean
  inverted?: boolean
}

export const basicButtonMixin = ({
  color = 'blue',
  compact,
  inverted,
  ...props
}: BasicButtonProps) => css`
  ${buttonBaseMixin(props)}
  border: 1px solid rgba(${getColor('gray200')});
  border-radius: 4px;
  background-color: transparent;
  color: #3a3a3a;
  padding: ${compact ? '7px 12px' : '14px 12px'};

  ${inverted &&
  css`
    border: 1px solid ${BASIC_INVERTED_COLORS[color]};
    background-color: ${BASIC_INVERTED_COLORS[color]};
    color: white;
  `}
`
