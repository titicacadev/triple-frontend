import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Property } from 'csstype'
import { Color, getColor } from '@titicaca/color-palette'

import { CSSProps } from '../css'
import { BaseSizes, MarginPadding } from '../commons'
import {
  borderRadiusMixin,
  positioningMixin,
  shadowMixin,
  marginMixin,
  paddingMixin,
  centeredMixin,
  clearingMixin,
  horizontalScrollMixin,
} from '../mixins'

export type ContainerProps = PropsWithChildren<{
  margin?: MarginPadding
  padding?: MarginPadding
  positioning?: MarginPadding

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
    float: props.floated ?? 'none',
    backgroundColor: props.backgroundColor
      ? `rgba(${getColor(props.backgroundColor)})`
      : undefined,
  }),
  marginMixin,
  paddingMixin,
  centeredMixin,
  clearingMixin,
  horizontalScrollMixin,
  shadowMixin,
  positioningMixin,
  borderRadiusMixin,
  (props) => props.css,
)

export default Container
