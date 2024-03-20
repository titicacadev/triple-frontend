import { PropsWithChildren } from 'react'
import { Container } from '@titicaca/kint5-core-elements'

export const ModalBody = ({ children, ...props }: PropsWithChildren) => {
  return (
    <Container
      css={{
        padding: '26px 16px',
        backgroundColor: 'var(--color-kint5-gray20)',
      }}
      {...props}
    >
      {children}
    </Container>
  )
}
