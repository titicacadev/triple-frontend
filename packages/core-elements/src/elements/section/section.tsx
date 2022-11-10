import { css } from 'styled-components'

import { Container, ContainerProps } from '../container'
import { HR2 } from '../hr'

export interface SectionProps extends ContainerProps {
  divider?: string
  anchor?: string
}

export function Section({
  css: cssProp,
  children,
  divider,
  anchor,
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
        {...props}
        css={css`
          position: relative;
          min-width: 320px;
          max-width: 768px;
          padding-left: 30px;
          padding-right: 30px;
          ${cssProp};
        `}
      >
        {children}
      </Container>
      {divider === 'bottom' && <HR2 compact />}
    </>
  )
}
