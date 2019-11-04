import React from 'react'
import { Container, Text, Image, MarginPadding } from '@titicaca/core-elements'
import TextElement from './text-element'

export default function Author({
  source: { name, bio, image, intro },
  bioOverride,
  introOverride,
  margin,
}: {
  source: {
    name: string
    bio?: string
    image?: any
    intro?: { text?: string; rawHTML?: string }
  }
  bioOverride?: string
  introOverride?: { text?: string; rawHTML?: string }
  margin: MarginPadding
}) {
  const displayedBio = (bioOverride || bio || '').replace('\n', '')
  const displayedIntro = introOverride || intro

  return (
    <Container margin={margin}>
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
          {displayedBio}
        </Text>
      </Container>

      {displayedIntro && <TextElement value={displayedIntro} />}
    </Container>
  )
}
