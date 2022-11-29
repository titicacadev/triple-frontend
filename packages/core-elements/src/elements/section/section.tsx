import { css } from 'styled-components'

import { Container, ContainerProps } from '../container'
import { HR2 } from '../hr'

export interface SectionProps extends ContainerProps {
  divider?: string
  anchor?: string
}

export function Section({ children, divider, anchor, ...props }: SectionProps) {
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
        css={css`
          position: relative;
          min-width: 320px;
          max-width: 768px;
          padding-left: 30px;
          padding-right: 30px;
        `}
        {...props}
      >
        {children}
      </Container>
      {divider === 'bottom' && <HR2 compact />}
    </>
  )
}
