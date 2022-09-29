import { ComponentType } from 'react'
import { H1, H2, H3, H4 } from '@titicaca/core-elements'

interface HeadingProps {
  href?: string
  emphasize?: boolean
  headline?: string
  children: string
}

export const MH1 = tripleDocumentHeading(
  ({ children, ...props }: HeadingProps) => (
    <H1
      {...props}
      css={{
        margin: '25px 30px 20px 30px',
      }}
    >
      {children}
    </H1>
  ),
)

export const MH2 = tripleDocumentHeading(
  ({ children, ...props }: HeadingProps) => (
    <H2 margin={{ top: 20, bottom: 20, left: 30, right: 30 }} {...props}>
      {children}
    </H2>
  ),
)

export const MH3 = tripleDocumentHeading(
  ({ compact, children, ...props }: HeadingProps & { compact: boolean }) => (
    <H3
      margin={compact ? { top: 13 } : { top: 20, left: 30, right: 30 }}
      {...props}
    >
      {children}
    </H3>
  ),
)

export const MH4 = tripleDocumentHeading(
  ({ children, ...props }: HeadingProps) => (
    <H4 margin={{ top: 20, left: 30, right: 30 }} {...props}>
      {children}
    </H4>
  ),
)

function tripleDocumentHeading<P extends object>(
  Component: ComponentType<P & HeadingProps>,
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
