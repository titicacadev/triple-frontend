import { ReactNode } from 'react'
import { Container, Text } from '@titicaca/core-elements'

export default function ModalBody({
  title,
  description,
}: {
  title?: string
  description?: ReactNode
}) {
  return (
    <Container
      css={{
        padding: '40px 30px',
      }}
    >
      {title ? (
        <Text bold center size="big" color="gray" margin={{ bottom: 10 }}>
          {title}
        </Text>
      ) : null}
      <Text center size="large" lineHeight={1.38} color="gray">
        {description}
      </Text>
    </Container>
  )
}
