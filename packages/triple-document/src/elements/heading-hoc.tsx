import React from 'react'

export default function Heading<P extends object>(
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
