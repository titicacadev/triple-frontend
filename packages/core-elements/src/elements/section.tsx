import { css } from 'styled-components'

import Container, { ContainerProps } from './container'
import { HR2 } from './hr'

export interface SectionProps extends ContainerProps {
  divider?: string
  anchor?: string
  minWidth?: number | string
  maxWidth?: number | string
}

function Section({
  css: _css,
  children,
  divider,
  anchor,
  minWidth = 320,
  maxWidth = 768,
  padding = { left: 30, right: 30 },
  ...props
}: SectionProps) {
  if (!children) {
    return null
  }

  return (
    <>
      {divider === 'top' && <HR2 compact />}
      <Container
        id={anchor}
        centered
        clearing
        padding={padding}
        {...props}
        css={
          {
            minWidth,
            maxWidth,
            position: 'relative',
          } &&
          css`
            ${_css}
          `
        }
      >
        {children}
      </Container>
      {divider === 'bottom' && <HR2 compact />}
    </>
  )
}

export default Section
