import { PropsWithChildren } from 'react'
import styled, { css, ThemedStyledProps } from 'styled-components'

import { MarginPadding } from '../../commons'
import {
  KeyOfShadowSize,
  marginMixin,
  paddingMixin,
  shadowMixin,
  ShadowMixinProps,
} from '../../mixins'

export const Segment = styled.div<{
  margin?: MarginPadding
  padding?: MarginPadding
}>`
  padding: 20px;
  border-radius: 6px;
  background-color: #fafafa;

  ${marginMixin}

  ${paddingMixin}

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`

export interface BoxProps {
  radius: number
  margin: MarginPadding
  padding: MarginPadding
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
  ${marginMixin}
  ${paddingMixin}

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
 *  - margin: MarginPadding
 *  - padding: MarginPadding
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
