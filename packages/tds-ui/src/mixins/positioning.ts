import { css } from 'styled-components'

import { MarginPadding } from '../commons'
import { unit } from '../utils/unit'

export interface PositioningMixinProps {
  positioning?: MarginPadding
}

export const positioningMixin = ({ positioning }: PositioningMixinProps) =>
  positioning
    ? css`
        top: ${positioning.top !== undefined
          ? unit(positioning.top)
          : undefined};
        right: ${positioning.right !== undefined
          ? unit(positioning.right)
          : undefined};
        bottom: ${positioning.bottom !== undefined
          ? unit(positioning.bottom)
          : undefined};
        left: ${positioning.left !== undefined
          ? unit(positioning.left)
          : undefined};
      `
    : undefined
