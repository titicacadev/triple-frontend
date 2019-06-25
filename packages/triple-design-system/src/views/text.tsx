import * as React from 'react'
import Container from '../elements/container'
import Text from '../elements/text'
import { MarginPadding } from '../commons'
import * as CSS from 'csstype'

export function H1({
  href,
  headline,
  emphasize,
  margin,
  textAlign,
  children,
  ...props
}: {
  href?: string
  headline?: string
  emphasize?: boolean
  margin?: MarginPadding
  textAlign?: CSS.TextAlignProperty
  children?: string
}) {
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

export function H2({ children, ...props }) {
  return (
    <Text size="big" color="gray" {...props}>
      {children}
    </Text>
  )
}

export function H3({ children, ...props }) {
  return (
    <Text bold size="large" color="gray" {...props}>
      {children}
    </Text>
  )
}

export function H4({ children, ...props }) {
  return (
    <Text bold size="large" color="blue" {...props}>
      {children}
    </Text>
  )
}

export function Paragraph({ children, ...props }) {
  return (
    <Text lineHeight={1.63} alpha={0.9} {...props}>
      {children}
    </Text>
  )
}
