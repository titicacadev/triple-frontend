import { PropsWithChildren } from 'react'
import styled, { css, CSSProp } from 'styled-components'

import { KeyOfShadowSize, shadowMixin, ShadowMixinProps } from '../../mixins'
import { shouldForwardProp } from '../../utils/should-forward-prop'

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
    css?: CSSProp
  }
>

const borderRadius = ({ radius = 0 }: { radius?: number }) => css`
  border-radius: ${radius}px;
`

const shadowMixinWithDefault = (props: ShadowMixinProps) =>
  shadowMixin({ shadow: 'medium', ...props })

export const CardFrame = styled.div.withConfig({
  shouldForwardProp,
})<CardProps>`
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
