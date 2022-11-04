import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Property } from 'csstype'
import { Color, getColor } from '@titicaca/color-palette'

import { CSSProps } from '../css'
import { BaseSizes } from '../commons'
import {
  borderRadiusMixin,
  shadowMixin,
  centeredMixin,
  clearingMixin,
  horizontalScrollMixin,
} from '../mixins'

export type ContainerProps = PropsWithChildren<{
  position?: Property.Position
  display?: Property.Display

  centered?: boolean
  borderRadius?: number
  clearing?: boolean
  floated?: Property.Float
  horizontalScroll?: boolean
  shadow?: BaseSizes
  backgroundColor?: Color
}> &
  CSSProps

const Container = styled.div<ContainerProps>(
  (props) => ({
    boxSizing: 'border-box',
    position: props.position,
    display: props.display,
    float: props.floated ?? 'none',
    backgroundColor: props.backgroundColor
      ? `rgba(${getColor(props.backgroundColor)}) `
      : undefined,
  }),
  centeredMixin,
  clearingMixin,
  horizontalScrollMixin,
  shadowMixin,
  borderRadiusMixin,
  (props) => props.css,
)

export default Container
