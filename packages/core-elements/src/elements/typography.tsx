import React, { PropsWithChildren } from 'react'
import * as CSS from 'csstype'

import { MarginPadding } from '../commons'

import Text, { TextProps } from './text'
import Container from './container'

export type H1Props = PropsWithChildren<
  TextProps & {
    href?: string
    headline?: string
    emphasize?: boolean
    margin?: MarginPadding
    textAlign?: CSS.Property.TextAlign
  }
>

export type H2Props = PropsWithChildren<TextProps>
export type H3Props = PropsWithChildren<TextProps>
export type H4Props = PropsWithChildren<TextProps>
export type ParagraphProps = PropsWithChildren<TextProps>

export function H1({
  href,
  headline,
  emphasize,
  margin,
  textAlign,
  children,
  ...props
}: H1Props) {
  return (
    <Container id={href} margin={margin} textAlign={textAlign}>
      {headline && (
        <Text bold size="tiny" color="blue" margin={{ bottom: 3 }}>
          {headline}
        </Text>
      )}
      <Text bold size="huge" color={emphasize ? 'blue' : 'gray'} {...props}>
        {children}
      </Text>
    </Container>
  )
}

export function H2({ children, ...props }: H2Props) {
  return (
    <Text size="big" color="gray" {...props}>
      {children}
    </Text>
  )
}

export function H3({ children, ...props }: H3Props) {
  return (
    <Text bold size="large" color="gray" {...props}>
      {children}
    </Text>
  )
}

export function H4({ children, ...props }: H4Props) {
  return (
    <Text bold size="large" color="blue" {...props}>
      {children}
    </Text>
  )
}

export function Paragraph({ children, ...props }: ParagraphProps) {
  return (
    <Text lineHeight={1.63} alpha={0.9} {...props}>
      {children}
    </Text>
  )
}
