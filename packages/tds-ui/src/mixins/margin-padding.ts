import { css } from 'styled-components'

import { MarginPadding } from '../commons'
import { unit } from '../utils/unit'

export function formatMarginPadding(
  marginPadding: MarginPadding | undefined,
  key: 'margin' | 'padding',
) {
  if (!marginPadding) {
    return undefined
  }

  if (key === 'margin') {
    return css`
      /* stylelint-disable declaration-block-no-redundant-longhand-properties */
      margin-top: ${unit(marginPadding.top || 0)};
      margin-left: ${unit(marginPadding.left || 0)};
      margin-right: ${unit(marginPadding.right || 0)};
      margin-bottom: ${unit(marginPadding.bottom || 0)};
      /* stylelint-enable declaration-block-no-redundant-longhand-properties */
    `
  } else {
    return css`
      /* stylelint-disable declaration-block-no-redundant-longhand-properties */
      padding-top: ${unit(marginPadding.top || 0)};
      padding-left: ${unit(marginPadding.left || 0)};
      padding-right: ${unit(marginPadding.right || 0)};
      padding-bottom: ${unit(marginPadding.bottom || 0)};
      /* stylelint-enable declaration-block-no-redundant-longhand-properties */
    `
  }
}

export interface MarginMixinProps {
  margin?: MarginPadding
}

export const marginMixin = ({ margin }: MarginMixinProps) =>
  formatMarginPadding(margin, 'margin')

export interface PaddingMixinProps {
  padding?: MarginPadding
}

export const paddingMixin = ({ padding }: PaddingMixinProps) =>
  formatMarginPadding(padding, 'padding')
