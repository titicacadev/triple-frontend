import * as React from 'react'
import * as CSS from 'csstype'

import Container from './container'
import { HR2 } from './hr'
import { MarginPadding } from '../commons'

export default function Section({
  minWidth = 320,
  maxWidth = 760,
  padding = { left: 30, right: 30 },
  margin,
  divider,
  anchor,
  userSelect,
  children,
  ...props
}: {
  minWidth?: number
  maxWidth?: number
  padding?: MarginPadding
  margin?: MarginPadding
  divider?: string
  anchor?: string
  userSelect?: CSS.UserSelectProperty
  children?: React.ReactNode
}) {
  if (React.Children.toArray(children).length > 0) {
    return (
      <>
        {divider === 'top' && <HR2 compact />}

        <Container
          id={anchor}
          position="relative"
          clearing
          centered
          minWidth={minWidth}
          maxWidth={maxWidth}
          padding={padding}
          margin={margin}
          userSelect={userSelect}
          {...props}
        >
          {children}
        </Container>

        {divider === 'bottom' && <HR2 compact />}
      </>
    )
  }

  return null
}
