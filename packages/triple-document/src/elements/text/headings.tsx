import * as React from 'react'
import {
  Container,
  Text,
  TextProps,
  MarginPadding,
} from '@titicaca/core-elements'
import * as CSS from 'csstype'

export interface H1Props extends TextProps {
  href?: string
  headline?: string
  emphasize?: boolean
  margin?: MarginPadding
  textAlign?: CSS.Property.TextAlign
  children?: string
}

export type H2Props = TextProps
export type H3Props = TextProps
export type H4Props = TextProps

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

export const MH1 = tripleDocumentHeading(({ children, ...props }: H1Props) => (
  <H1 margin={{ top: 25, bottom: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H1>
))

export const MH2 = tripleDocumentHeading(({ children, ...props }: H2Props) => (
  <H2 margin={{ top: 20, bottom: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H2>
))

export const MH3 = tripleDocumentHeading(
  ({ compact, children, ...props }: H3Props & { compact: boolean }) => (
    <H3
      margin={compact ? { top: 13 } : { top: 20, left: 30, right: 30 }}
      {...props}
    >
      {children}
    </H3>
  ),
)

export const MH4 = tripleDocumentHeading(({ children, ...props }: H4Props) => (
  <H4 margin={{ top: 20, left: 30, right: 30 }} {...props}>
    {children}
  </H4>
))

function tripleDocumentHeading<P extends object>(
  Component: React.ComponentType<
    P & {
      href: string
      emphasize: boolean
      headline: string
    }
  >,
) {
  return function WrappedHeading({
    value: { text, href, emphasize, headline },
    ...props
  }: {
    value: {
      text: string
      href: string
      emphasize: boolean
      headline: string
    }
  } & P) {
    return (
      <Component
        href={href}
        emphasize={emphasize}
        headline={headline}
        {...(props as P)}
      >
        {text}
      </Component>
    )
  }
}
