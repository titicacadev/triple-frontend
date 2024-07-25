import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'

import {
  borderRadiusMixin,
  BorderRadiusMixinProps,
  shadowMixin,
  ShadowMixinProps,
} from '../../mixins'

export const Segment = styled.div`
  padding: 20px;
  border-radius: 6px;
  background-color: #fafafa;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`

const shadowMixinWithDefault = (props: ShadowMixinProps) =>
  shadowMixin({ shadow: 'medium', ...props })

export const CardFrame = styled.div<BorderRadiusMixinProps & ShadowMixinProps>`
  ${borderRadiusMixin}
  ${shadowMixinWithDefault}
`

export interface CardProps
  extends PropsWithChildren<BorderRadiusMixinProps & ShadowMixinProps> {}

/**
 * Card Component
 *
 * Props
 *  - borderRadius: number
 *  - shadow: ShadowType
 *  - shadowValue: string
 */
export function Card({
  children,
  borderRadius,
  shadow,
  shadowValue,
  ...props
}: CardProps) {
  return (
    <CardFrame
      {...props}
      borderRadius={borderRadius}
      shadow={shadow}
      shadowValue={shadowValue}
    >
      {children}
    </CardFrame>
  )
}
