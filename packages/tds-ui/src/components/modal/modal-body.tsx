import { PropsWithChildren } from 'react'
import { Container } from '@titicaca/core-elements'
import { css } from 'styled-components'

export const ModalBody = ({ children, ...props }: PropsWithChildren) => {
  return (
    <Container
      css={css`
        padding: 40px 30px;
      `}
      {...props}
    >
      {children}
    </Container>
  )
}
