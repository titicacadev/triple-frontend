import styled from 'styled-components'
import * as CSS from 'csstype'

import Container from './container'

export interface FlexBoxProps
  extends Pick<
    CSS.Properties,
    | 'flexGrow'
    | 'flexShrink'
    | 'flexBasis'
    | 'flexDirection'
    | 'flexWrap'
    | 'justifyContent'
    | 'alignItems'
    | 'alignContent'
    | 'alignSelf'
    | 'order'
  > {
  flex?: boolean
}

export default styled(Container)<FlexBoxProps>`
  ${({ flex }) => flex && `display: flex;`}
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({ order }) => order && `order: ${order};`}
  ${({ flexShrink }) => flexShrink && `flex-shrink: ${flexShrink};`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ alignContent }) => alignContent && `align-content: ${alignContent};`}
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ cursor }) => cursor && `cursor: ${cursor};`}
`
