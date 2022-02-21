import { Property } from 'csstype'

import { MarginPadding } from './commons'
import { marginMixin, paddingMixin, positioningMixin } from './mixins'

export interface PrimitiveProps {
  // Layout
  alignSelf?: Property.AlignSelf
  display?: Property.Display
  flex?: Property.Flex
  flexBasis?: Property.FlexBasis
  flexGrow?: Property.FlexGrow
  flexShrink?: Property.FlexShrink
  gridArea?: Property.GridArea
  gridColumn?: Property.GridColumn
  gridColumnEnd?: Property.GridColumnEnd
  gridColumnStart?: Property.GridColumnStart
  gridRow?: Property.GridRow
  gridRowEnd?: Property.GridRowEnd
  gridRowStart?: Property.GridRowStart
  justifySelf?: Property.JustifySelf
  order?: Property.Order
  overflow?: Property.Overflow
  textAlign?: Property.TextAlign
  whiteSpace?: Property.WhiteSpace
  // Spacing
  margin?: MarginPadding
  padding?: MarginPadding
  // Sizing
  width?: number | string
  height?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  // Positioning
  position?: Property.Position
  positioning?: MarginPadding
}

export const primitiveProps = [
  (props: PrimitiveProps) => ({
    alignSelf: props.alignSelf,
    flex: props.flex,
    flexBasis: props.flexBasis,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    gridArea: props.gridArea,
    gridColumn: props.gridColumn,
    gridColumnEnd: props.gridColumnEnd,
    gridColumnStart: props.gridColumnStart,
    gridRow: props.gridRow,
    gridRowEnd: props.gridRowEnd,
    gridRowStart: props.gridRowStart,
    justifySelf: props.justifySelf,
    order: props.order,
    overflow: props.overflow,
    textAlign: props.textAlign,
    whiteSpace: props.whiteSpace,
    width: props.width,
    height: props.height,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    position: props.position,
    positioning: props.positioning,
  }),
  marginMixin,
  paddingMixin,
  positioningMixin,
]
