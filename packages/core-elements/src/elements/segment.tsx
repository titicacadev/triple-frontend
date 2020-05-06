import React, { PropsWithChildren } from 'react'
import styled, { css, ThemedStyledProps } from 'styled-components'

import { MarginPadding } from '../commons'
import { marginMixin, paddingMixin } from '../mixins'
import { shadowMixin, KeyOfShadowSize, ShadowMixinProps } from '../mixins/box'

// eslint-disable-next-line no-unexpected-multiline
export const Segment = styled.div<{
  margin?: MarginPadding
  padding?: MarginPadding
}>`
  padding: 20px;
  border-radius: 6px;
  background-color: #fafafa;

  ${marginMixin}

  ${paddingMixin}

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

export type BoxProps = {
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
}: ThemedStyledProps<any, { radius?: number }>) => css`
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

export default Segment
