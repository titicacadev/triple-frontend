import * as React from 'react'

import Container from './container'
import { HR2 } from './hr'

export default function Section({
  divider,
  anchor,
  children,
  minWidth = 320,
  maxWidth = 760,
  padding = { left: 30, right: 30 },
  ...props
}: {
  divider?: string
  anchor?: string
  children?: React.ReactNode
} & Parameters<typeof Container>['0']) {
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
