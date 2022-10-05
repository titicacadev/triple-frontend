import styled from 'styled-components'
import { Property } from 'csstype'

import Container, { ContainerProps } from './container'

export interface FlexBoxProps extends FlexItemProps {
  flex?: boolean
  flexDirection?: Property.FlexDirection
  flexWrap?: Property.FlexWrap
  justifyContent?: Property.JustifyContent
  alignItems?: Property.AlignItems
  alignContent?: Property.AlignContent
  gap?: Property.Gap
  columnGap?: Property.ColumnGap
  rowGap?: Property.RowGap
}

export interface FlexItemProps extends ContainerProps {
  flexGrow?: Property.FlexGrow
  flexShrink?: Property.FlexShrink
  flexBasis?: Property.FlexBasis
  alignSelf?: Property.AlignSelf
  order?: Property.Order
}

export const StyledFlexBox = styled(Container)<FlexBoxProps>(
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

    // 중첩된 flex 사용할 경우에만 사용할 것
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    flexBasis: props.flexBasis,
    alignSelf: props.alignSelf,
    order: props.order,
  }),
  (props) => props.css,
)

const FlexBox = (props: FlexBoxProps) => {
  return <StyledFlexBox {...props} />
}

const FlexItem = styled.div<FlexItemProps>(
  (props) => ({
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    flexBasis: props.flexBasis,
    alignSelf: props.alignSelf,
    order: props.order,
  }),
  (props) => props.css,
)

FlexBox.Item = FlexItem

export default FlexBox
