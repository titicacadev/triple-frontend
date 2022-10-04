import Container from '../container'

import { ModalDescription } from './modal-description'
import { ModalTitle } from './modal-title'

interface ModalBodyProps {
  title?: React.ReactText
  description?: React.ReactText
}

export function ModalBody({ title, description }: ModalBodyProps) {
  return (
    <Container
      css={{
        padding: '40px 30px 40px 30px',
      }}
    >
      {title ? <ModalTitle>{title}</ModalTitle> : null}
      {description ? <ModalDescription>{description}</ModalDescription> : null}
    </Container>
  )
}
