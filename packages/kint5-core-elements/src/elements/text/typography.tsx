import * as CSS from 'csstype'
import { CSSObject } from 'styled-components'

import { Container } from '../container'

import { Text, TextProps } from './text'

export type H1Props = TextProps & {
  href?: string
  headline?: string
  emphasize?: boolean
  textAlign?: CSS.Property.TextAlign
  headlineCss?: CSSObject
  textCss?: CSSObject
}

export type H2Props = TextProps
export type H3Props = TextProps
export type H4Props = TextProps
export type ParagraphProps = TextProps

export function H1({
  href,
  headline,
  emphasize,
  textAlign,
  headlineCss,
  textCss,
  children,
  ...props
}: H1Props) {
  return (
    <Container
      id={href}
      css={{
        textAlign,
      }}
      {...props}
    >
      {headline && (
        <Text
          bold
          size="tiny"
          color="blue"
          margin={{ bottom: 3 }}
          css={headlineCss}
        >
          {headline}
        </Text>
      )}
      <Text
        bold
        size="huge"
        css={{
          ...(emphasize && { color: 'var(--color-blue' }),
          ...textCss,
        }}
      >
        {children}
      </Text>
    </Container>
  )
}

export function H2({ children, ...props }: H2Props) {
  return (
    <Text size="big" {...props}>
      {children}
    </Text>
  )
}

export function H3({ children, ...props }: H3Props) {
  return (
    <Text bold size="large" {...props}>
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
