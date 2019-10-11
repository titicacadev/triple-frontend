import * as React from 'react'

import { Container, Text, Image, HR7 } from '@titicaca/core-elements'

export default function Author({
  source: { name, bio, image, intro },
  bioOverride,
  onClick,
}: {
  source: { name: string; bio?: string; image?: any; intro: string }
  bioOverride?: string
  onClick?: (e?: React.SyntheticEvent) => any
}) {
  return (
    <Container
      margin={{ top: 41, left: 30, right: 30, bottom: 50 }}
      onClick={onClick}
    >
      {image && (
        <Image
          floated="right"
          circular
          diameter={45}
          src={image.sizes.large.url}
        />
      )}
      <Container>
        <Text bold size="large" color="gray" padding={{ top: 7, bottom: 4 }}>
          {name}
        </Text>
        <Text size="tiny" color="gray" alpha={0.3}>
          {bioOverride || bio}
        </Text>
      </Container>
      <Text
        size="small"
        color="gray"
        alpha={0.5}
        lineHeight={1.43}
        margin={{ top: 21 }}
      >
        {intro}
      </Text>
    </Container>
  )
}
