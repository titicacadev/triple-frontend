import React from 'react'

import Container from '../elements/container'
import Text from '../elements/text'
import Image from '../elements/image'

export function Author({ name, bio, image, onClick }) {
  return (
    <Container centered textAlign="center" onClick={onClick}>
      {image && <Image size="medium" circular src={image.sizes.large.url} />}
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
        {bio}
      </Text>
    </Container>
  )
}
