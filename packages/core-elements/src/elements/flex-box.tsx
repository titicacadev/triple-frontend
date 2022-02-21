import styled from 'styled-components'
import { Property } from 'csstype'

import Container, { ContainerProps } from './container'

export interface FlexBoxProps extends ContainerProps {
  flexDirection?: Property.FlexDirection
  flexWrap?: Property.FlexWrap
  justifyContent?: Property.JustifyContent
  alignItems?: Property.AlignItems
  alignContent?: Property.AlignContent
  gap?: Property.Gap
  columnGap?: Property.ColumnGap
  rowGap?: Property.RowGap
}

const FlexBox = styled(Container)<FlexBoxProps>((props) => ({
  flexDirection: props.flexDirection,
  flexWrap: props.flexWrap,
  justifyContent: props.justifyContent,
  alignItems: props.alignItems,
  alignContent: props.alignContent,
  gap: props.gap,
  columnGap: props.columnGap,
  rowGap: props.rowGap,
}))

export default FlexBox
