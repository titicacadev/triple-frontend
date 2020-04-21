import styled, { css } from 'styled-components'

import { MarginPadding, BaseSizes } from '../commons'
import { marginMixin, paddingMixin } from '../mixins'

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

const ShadowMap: { [key in BaseSizes]: string } = {
  small: '0 0 10px 0 rgba(0, 0, 0, 0.07)',
  medium: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
  large: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
}

const shadow = ({ shadow: key }: any) => css`
  box-shadow: ${ShadowMap[key as KeyOfShadowMap]};
`
const radius = ({ radius = 0 }: any) => css`
  border-radius: ${radius}px;
`

export type KeyOfShadowMap = keyof typeof ShadowMap
export type ShadowMapType = { [key in KeyOfShadowMap]: string }

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
  ${paddingMixin}

  ${radius}
  ${shadow}

  /* box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07); */
`

export default Segment
