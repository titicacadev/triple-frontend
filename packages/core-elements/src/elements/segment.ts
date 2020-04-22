import styled, { css, ThemedStyledProps } from 'styled-components'

import { MarginPadding } from '../commons'
import { marginMixin, paddingMixin } from '../mixins'
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

const borderRadius = ({
  radius = 0,
}: ThemedStyledProps<{ radius?: number }, any>) => css`
  border-radius: ${radius}px;
`

const shadowMixinWithDefault = (props: ThemedStyledProps<any, any>) =>
  shadowMixin({ shadow: 'medium', ...props })

/**
 * Card Component
 *
 * Props
 *  - radius: number
 *  - shadow: ShadowType
 *  - margin: MarginPadding
 *  - padding: MarginPadding
 */
export const Card = styled.div<Partial<BoxProps>>`
  ${marginMixin}
  ${paddingMixin}

  ${borderRadius}
  ${shadowMixinWithDefault}
`

export default Segment
