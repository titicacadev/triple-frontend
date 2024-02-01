import { ComponentType } from 'react'
import { H1, H2, H3, H4 } from '@titicaca/kint5-core-elements'

interface HeadingProps {
  href?: string
  emphasize?: boolean
  headline?: string
  children: string
}

export const MH1 = tripleDocumentHeading(
  ({ children, ...props }: HeadingProps) => (
    <H1
      headlineCss={{
        fontSize: 14,
        color: 'var(--color-kint5-brand1)',
        marginBottom: 7,
      }}
      textCss={{ fontSize: 18 }}
      css={{
        margin: '25px 16px 20px',
      }}
      {...props}
    >
      {children}
    </H1>
  ),
)

export const MH2 = tripleDocumentHeading(
  ({ children, ...props }: HeadingProps) => (
    <H2 css={{ fontSize: 20, fontWeight: 700, margin: '20px 16px' }} {...props}>
      {children}
    </H2>
  ),
)

export const MH3 = tripleDocumentHeading(
  ({
    compact,
    embedded,
    children,
    ...props
  }: HeadingProps & { compact: boolean; embedded?: boolean }) => (
    <H3
      css={{
        fontSize: 18,
        margin: embedded ? '13px 0 0' : compact ? '13px 16px 0' : '20px 16px 0',
      }}
      {...props}
    >
      {children}
    </H3>
  ),
)

export const MH4 = tripleDocumentHeading(
  ({ children, ...props }: HeadingProps) => (
    <H4
      css={{
        fontSize: 18,
        color: 'var(--color-kint5-brand1)',
        margin: '20px 16px 0',
      }}
      {...props}
    >
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
