import { css } from 'styled-components'

import Container, { ContainerProps } from './container'
import { HR2 } from './hr'

export interface SectionProps extends ContainerProps {
  divider?: string
  anchor?: string
}

function Section({
  css: _css,
  children,
  divider,
  anchor,
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
        css={css`
          position: relative;
          min-width: 320px;
          max-width: 768px;
          ${_css};
        `}
      >
        {children}
      </Container>
      {divider === 'bottom' && <HR2 compact />}
    </>
  )
}

export default Section
