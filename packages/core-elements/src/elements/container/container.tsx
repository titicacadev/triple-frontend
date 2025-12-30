import { PropsWithChildren } from 'react'
import styled, { CSSProp } from 'styled-components'
import { Property } from 'csstype'
import { Color, getColor } from '@titicaca/color-palette'

import { BaseSizes } from '../../commons'
import {
  borderRadiusMixin,
  shadowMixin,
  centeredMixin,
  clearingMixin,
  horizontalScrollMixin,
} from '../../mixins'
import { shouldForwardProp } from '../../utils/should-forward-prop'

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
  css?: CSSProp
}>

/**
 * 레이아웃 구성 시 컴포넌트를 묶고 스타일을 추가할 때 사용합니다.
 *
 * - 제공된 prop 외의 스타일은 css prop을 사용합니다.
 */
export const Container = styled.div.withConfig({
  shouldForwardProp,
})<ContainerProps>(
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
