import styled from 'styled-components'
import { Property } from 'csstype'

import Container, { ContainerProps } from './container'

export interface FlexBoxProps extends ContainerProps {
  flex?: boolean
  flexDirection?: Property.FlexDirection
  flexWrap?: Property.FlexWrap
  justifyContent?: Property.JustifyContent
  alignItems?: Property.AlignItems
  alignContent?: Property.AlignContent
  gap?: Property.Gap
  columnGap?: Property.ColumnGap
  rowGap?: Property.RowGap

  // deprecated
  flexGrow?: Property.FlexGrow
  flexShrink?: Property.FlexShrink
  flexBasis?: Property.FlexBasis
  alignSelf?: Property.AlignSelf
  order?: Property.Order
}

const FlexBox = styled(Container)<FlexBoxProps>(
  (props) => ({
    display: props.flex ? 'flex' : undefined,
    flexDirection: props.flexDirection,
    flexWrap: props.flexWrap,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    alignContent: props.alignContent,
    gap: props.gap,
    columnGap: props.columnGap,
    rowGap: props.rowGap,

    // deprecated
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    flexBasis: props.flexBasis,
    alignSelf: props.alignSelf,
    order: props.order,
  }),
  (props) => props.css,
)

export default FlexBox
