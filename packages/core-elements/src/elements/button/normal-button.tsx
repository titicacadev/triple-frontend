import { css } from 'styled-components'
import { Color, getColor } from '@titicaca/color-palette'

import { buttonBaseMixin, ButtonBaseProps } from './button-base'
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

export interface NormalButtonProps extends ButtonBaseProps {
  borderRadius?: number
  compact?: boolean
  color?: Color
}

export const normalButtonMixin = ({
  borderRadius,
  compact,
  color = 'blue',
  size = 'tiny',
  ...props
}: NormalButtonProps) => css`
  ${buttonBaseMixin({ size, ...props })}
  border-radius: ${borderRadius ? `${borderRadius}px` : undefined};
  background-color: rgba(${getColor(color)});
  color: #fff;

  ${compact ? COMPACT_NORMAL_PADDINGS[size] : NORMAL_PADDINGS[size]}
`
