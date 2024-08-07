import { css } from 'styled-components'
import type { Theme } from '@titicaca/tds-theme'

import { buttonBaseMixin, ButtonBaseMixinProps } from './button-base'
import { ButtonSize } from './types'

const NORMAL_PADDINGS: Partial<Record<ButtonSize, ReturnType<typeof css>>> = {
  tiny: css({ padding: '13px 25px' }),
  small: css({ padding: '14px 25px' }),
  large: css({ padding: '16px 25px' }),
}

const COMPACT_NORMAL_PADDINGS: Partial<
  Record<ButtonSize, ReturnType<typeof css>>
> = {
  tiny: css({ padding: '9px 15px' }),
}

export interface NormalButtonMixinProps extends ButtonBaseMixinProps {
  borderRadius?: number
  /**
   * Compact 버튼을 사용합니다. Normal 및 Basic 버튼에서만 사용할 수 있습니다.
   */
  compact?: boolean
  color?: keyof Theme['colors']
}

export const normalButtonMixin = ({
  borderRadius,
  compact,
  color = 'blue',
  size = 'tiny',
  ...props
}: NormalButtonMixinProps) => css`
  ${buttonBaseMixin({ size, ...props })}
  border-radius: ${borderRadius ? `${borderRadius}px` : undefined};
  background-color: ${({ theme }) => theme.colors[color]};
  color: #fff;

  ${compact ? COMPACT_NORMAL_PADDINGS[size] : NORMAL_PADDINGS[size]}
`
