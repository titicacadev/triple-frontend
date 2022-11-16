import styled, { css } from 'styled-components'
import { Color, getColor } from '@titicaca/color-palette'

import { ButtonBase, ButtonBaseProps } from './button-base'
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

export const NormalButton = styled(ButtonBase)<NormalButtonProps>`
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : undefined};
  background-color: ${({ color = 'blue' }) => `rgba(${getColor(color)}) `};
  color: #fff;

  ${({ compact, size = 'tiny' }) =>
    compact ? COMPACT_NORMAL_PADDINGS[size] : NORMAL_PADDINGS[size]}
`
