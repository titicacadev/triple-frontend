import React from 'react'
import styled from 'styled-components'

import { Container, Text, Image, GetGlobalColor } from '@titicaca/core-elements'
import { TextElement as OriginTextElement } from '@titicaca/triple-document'

const TextElement = styled(OriginTextElement)`
  & > a {
    font-weight: 500;
    color: rgba(${GetGlobalColor('gray')}, 0.5);
  }
`

export default function Author({
  source: { name, bio, image, intro },
  bioOverride,
  introOverride,
}: {
  source: {
    name: string
    bio?: string
    image?: any
    intro?: string
  }
  bioOverride?: string
  introOverride?: string
}) {
  return (
    <Container margin={{ top: 41, left: 30, right: 30, bottom: 50 }}>
      {image && (
        <Image
          floated="right"
          circular
          width={45}
          src={image.sizes.large.url}
        />
      )}
      <Container>
        <Text bold size="large" color="gray" padding={{ top: 7, bottom: 4 }}>
          {name}
        </Text>
        <Text size="tiny" color="gray" alpha={0.3} maxLines={1}>
          {(bioOverride || bio || '').replace('\n', '')}
        </Text>
      </Container>
      <TextElement
        size="small"
        color="gray"
        alpha={0.5}
        lineHeight={1.43}
        margin={{ top: 21 }}
        value={introOverride || intro}
      />
    </Container>
  )
}
