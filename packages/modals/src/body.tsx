import React from 'react'
import { Container, Text } from '@titicaca/core-elements'

export default function ModalBody({
  title,
  description,
}: {
  title?: string
  description?: React.ReactNode
}) {
  return (
    <Container padding={{ top: 40, bottom: 40, left: 30, right: 30 }}>
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
