import styled from 'styled-components'
import csstype from 'csstype'

import Container from './container'

export interface FlexBoxProps {
  flexGrow?: number
  order?: number
  flexShrink?: number
  flex?: boolean
  flexDirection?: csstype.FlexDirectionProperty
  flexWrap?: csstype.FlexWrapProperty
  justifyContent?: csstype.JustifyContentProperty
  alignItems?: csstype.AlignItemsProperty
  alignContent?: csstype.AlignContentProperty
  alignSelf?: csstype.AlignSelfProperty
  flexBasis?: string
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
`
