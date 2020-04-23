import React, { PropsWithChildren } from 'react'
import styled, { css, ThemedStyledProps } from 'styled-components'

import { MarginPadding } from '../commons'
import { marginMixin, paddingMixin } from '../mixins'
import { shadowMixin, KeyOfShadowSize } from '../mixins/box'

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
  }
>

const borderRadius = ({
  radius = 0,
}: ThemedStyledProps<any, any> & { radius?: number }) => css`
  border-radius: ${radius}px;
`

const shadowMixinWithDefault = (props: ThemedStyledProps<any, any>) =>
  shadowMixin({ shadow: 'medium', ...props })

/**
 * Card Component
 *
 * Props
 *  - radius: number
 *  - shadow: ShadowType
 *  - margin: MarginPadding
 *  - padding: MarginPadding
 */
export const CardFrame = styled.div<Partial<CardProps>>`
  ${marginMixin}
  ${paddingMixin}

  ${borderRadius}
  ${shadowMixinWithDefault}
`

export function Card({ children, ...props }: PropsWithChildren<CardProps>) {
  return <CardFrame {...props}>{children}</CardFrame>
}

export default Segment
