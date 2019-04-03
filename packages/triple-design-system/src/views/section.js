import React, { Children } from 'react'
import Container from '../elements/container'
import { HR2 } from '../elements/hr'

export function Section({
  minWidth = 320,
  maxWidth = 760,
  padding = { left: 30, right: 30 },
  margin,
  divider,
  anchor,
  children,
  ...props
}) {
  if (Children.toArray(children).length > 0) {
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
