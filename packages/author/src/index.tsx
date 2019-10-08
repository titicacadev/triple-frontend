import * as React from 'react'

import { Container, Text, Image } from '@titicaca/core-elements'

export default function Author({
  source: { name, bio, image },
  bioOverride,
  onClick,
}: {
  source: { name: string; bio?: string; image?: any }
  bioOverride?: string
  onClick?: (e?: React.SyntheticEvent) => any
}) {
  return (
    <Container centered textAlign="center" onClick={onClick}>
      {image && <Image circular diameter={45} src={image.sizes.large.url} />}
      <Text bold size="large" color="gray" margin={{ top: 15 }}>
        {name}
      </Text>
      <Text
        center
        size="small"
        color="gray"
        alpha={0.5}
        lineHeight={1.43}
        margin={{ top: 5 }}
      >
        {bioOverride || bio}
      </Text>
    </Container>
  )
}
