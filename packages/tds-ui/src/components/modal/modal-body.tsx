import { PropsWithChildren } from 'react'
import { css } from 'styled-components'

import { Container } from '../container'

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
