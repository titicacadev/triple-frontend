import styled from 'styled-components'
import { Property } from 'csstype'

import Container, { ContainerProps } from './container'

export interface FlexBoxProps extends ContainerProps {
  flex?: boolean
  flexGrow?: Property.FlexGrow
  flexShrink?: Property.FlexShrink
  flexBasis?: Property.FlexBasis
  flexDirection?: Property.FlexDirection
  flexWrap?: Property.FlexWrap
  justifyContent?: Property.JustifyContent
  alignItems?: Property.AlignItems
  alignContent?: Property.AlignContent
  alignSelf?: Property.AlignSelf
  order?: Property.Order
  gap?: Property.Gap
  columnGap?: Property.ColumnGap
  rowGap?: Property.RowGap
}

const FlexBox = styled(Container)<FlexBoxProps>(
  (props) => ({
    display: props.flex ? 'flex' : undefined,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    flexBasis: props.flexBasis,
    flexDirection: props.flexDirection,
    flexWrap: props.flexWrap,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    alignContent: props.alignContent,
    alignSelf: props.alignSelf,
    order: props.order,
    gap: props.gap,
    columnGap: props.columnGap,
    rowGap: props.rowGap,
  }),
  (props) => props.css,
)

export default FlexBox
