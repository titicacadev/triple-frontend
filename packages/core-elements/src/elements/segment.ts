import styled, { css } from 'styled-components'

import { MarginPadding } from '../commons'
import { marginMixin, paddingMixin, formatMarginPadding } from '../mixins'
import { shadowMixin, KeyOfShadowMap } from '../mixins/box'

// eslint-disable-next-line no-unexpected-multiline
export const Segment = styled.div<{
  margin?: MarginPadding
  padding?: MarginPadding
}>`
  padding: 20px;
  border-radius: 6px;
  background-color: #fafafa;

  ${marginMixin}

  ${paddingMixin}

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

export type BoxProps = {
  width: number
  height: number
  radius: number
  shadow: KeyOfShadowMap
  margin: MarginPadding
  padding: MarginPadding
}

const borderRadius = ({ radius = 0 }: any) => css`
  border-radius: ${radius}px;
`

const DEFAULT_CARD_PADDING = { top: 10, right: 10, bottom: 10, left: 10 }
const paddingMixinWithDefault = ({ padding = DEFAULT_CARD_PADDING }: any) =>
  formatMarginPadding(padding, 'padding')

/**
 * Card Component
 *
 * Props
 *  - width: number
 *  - height: number
 *  - radius: number
 *  - shadow: ShadowType
 *  - margin: MarginPadding
 *  - padding: MarginPadding
 */
export const Card = styled.div<Partial<BoxProps>>`
  ${marginMixin}
  ${paddingMixinWithDefault}

  ${borderRadius}
  ${shadowMixin}
`

export default Segment
