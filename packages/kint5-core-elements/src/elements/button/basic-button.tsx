import { css } from 'styled-components'
import { Color } from '@titicaca/color-palette'

import { buttonBaseMixin, ButtonBaseOwnProps } from './button-base'

const BASIC_INVERTED_COLORS: Partial<Record<Color, string>> = {
  blue: '#368fff',
  gray: '#3a3a3a',
}

export interface BasicButtonOwnProps extends ButtonBaseOwnProps {
  color?: Color
  /**
   * Compact 버튼을 사용합니다. Normal 및 Basic 버튼에서만 사용할 수 있습니다.
   */
  compact?: boolean
  /**
   * Inverted 버튼을 사용합니다. Basic 버튼에서만 사용할 수 있습니다.
   */
  inverted?: boolean
}

export const basicButtonMixin = ({
  color = 'blue',
  compact,
  inverted,
  ...props
}: BasicButtonOwnProps) => css`
  ${buttonBaseMixin(props)}
  border: 1px solid var(--color-gray200);
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
