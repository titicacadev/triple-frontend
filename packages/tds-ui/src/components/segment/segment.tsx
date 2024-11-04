import { PropsWithChildren } from 'react'
import { css, styled } from 'styled-components'

import { shadowMixin, ShadowMixinProps } from '../../mixins'

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

export interface BoxProps {
  radius?: number
}

const borderRadius = ({ radius = 0 }) => css`
  border-radius: ${radius}px;
`

const shadowMixinWithDefault = (props: ShadowMixinProps) =>
  shadowMixin({ shadow: 'medium', ...props })

export const CardFrame = styled.div<BoxProps & ShadowMixinProps>`
  ${borderRadius}
  ${shadowMixinWithDefault}
`

export interface CardProps
  extends PropsWithChildren<BoxProps & ShadowMixinProps> {}

/**
 * Card Component
 *
 * Props
 *  - radius: number
 *  - shadow: ShadowType
 *  - shadowValue: string
 */
export function Card({
  children,
  radius,
  shadow,
  shadowValue,
  ...props
}: CardProps) {
  return (
    <CardFrame
      {...props}
      radius={radius}
      shadow={shadow}
      shadowValue={shadowValue}
    >
      {children}
    </CardFrame>
  )
}
