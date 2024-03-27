import { PropsWithChildren } from 'react'
import styled, { css, ThemedStyledProps } from 'styled-components'

import { KeyOfShadowSize, shadowMixin, ShadowMixinProps } from '../../mixins'

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
  radius: number
}

export type CardProps = Partial<
  BoxProps & {
    shadow: KeyOfShadowSize
    shadowValue?: string
  }
>

const borderRadius = ({
  radius = 0,
}: ThemedStyledProps<{ radius?: number }, unknown>) => css`
  border-radius: ${radius}px;
`

const shadowMixinWithDefault = (props: ShadowMixinProps) =>
  shadowMixin({ shadow: 'medium', ...props })

export const CardFrame = styled.div<CardProps>`
  ${borderRadius}
  ${shadowMixinWithDefault}
`

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
  className,
  ...props
}: PropsWithChildren<CardProps> & {
  className?: string
}) {
  return (
    <CardFrame className={className} {...props}>
      {children}
    </CardFrame>
  )
}
