import styled from 'styled-components'
import { Property } from 'csstype'
import { Color, getColor } from '@titicaca/color-palette'

import { BaseSizes } from '../commons'
import {
  borderRadiusMixin,
  shadowMixin,
  centeredMixin,
  clearingMixin,
  horizontalScrollMixin,
} from '../mixins'
import { PrimitiveProps, primitiveProps } from '../primitive'

export type ContainerProps = React.PropsWithChildren<{
  backgroundColor?: Color
  borderRadius?: number
  centered?: boolean
  clearing?: boolean
  cursor?: Property.Cursor
  floated?: Property.Float
  horizontalScroll?: boolean
  shadow?: BaseSizes
  userSelect?: Property.UserSelect
}> &
  PrimitiveProps

const Container = styled.div<ContainerProps>(
  (props) => ({
    textAlign: props.textAlign,
    userSelect: props.userSelect,
    cursor: props.cursor,
    float: props.floated ?? 'none',
    backgroundColor: props.backgroundColor
      ? `rgba(${getColor(props.backgroundColor)})`
      : undefined,
  }),
  centeredMixin,
  clearingMixin,
  horizontalScrollMixin,
  shadowMixin,
  borderRadiusMixin,
  ...primitiveProps,
)

export default Container
