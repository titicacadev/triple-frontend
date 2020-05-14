import React from 'react'

import { H1Props, H1, H2Props, H2, H3Props, H3, H4Props, H4 } from './text'

export function MH1({ children, ...props }: H1Props) {
  return (
    <H1 margin={{ top: 25, bottom: 20, left: 30, right: 30 }} {...props}>
      {children}
    </H1>
  )
}

export function MH2({ children, ...props }: H2Props) {
  return (
    <H2 margin={{ top: 20, bottom: 20, left: 30, right: 30 }} {...props}>
      {children}
    </H2>
  )
}

export function MH3({
  compact,
  children,
  ...props
}: H3Props & {
  compact: boolean
}) {
  return (
    <H3
      margin={compact ? { top: 13 } : { top: 20, left: 30, right: 30 }}
      {...props}
    >
      {children}
    </H3>
  )
}

export function MH4({ children, ...props }: H4Props) {
  return (
    <H4 margin={{ top: 20, left: 30, right: 30 }} {...props}>
      {children}
    </H4>
  )
}
