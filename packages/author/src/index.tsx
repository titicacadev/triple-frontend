import { Container, Text, MarginPadding, Image } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

import AuthorIntro from './author-intro'

export default function Author({
  source: { name, bio, image, intro },
  bioOverride,
  introOverride,
  margin,
}: {
  source: {
    name: string
    bio?: string
    image?: ImageMeta
    intro?: { text?: string; rawHTML?: string }
  }
  bioOverride?: string
  introOverride?: { text?: string; rawHTML?: string }
  margin?: MarginPadding
}) {
  const displayedBio = (bioOverride || bio || '').replace('\n', '')
  const displayedIntro = introOverride || intro

  return (
    <Container margin={margin}>
      {image && (
        <Image.Circular
          floated="right"
          width={45}
          src={image.sizes.large.url}
        />
      )}
      <Container>
        <Text bold size="large" color="gray" padding={{ top: 4, bottom: 4 }}>
          {name}
        </Text>
        <Text
          size="tiny"
          color="gray"
          alpha={0.3}
          maxLines={1}
          padding={{ right: 15 }}
        >
          {displayedBio}
        </Text>
      </Container>

      {displayedIntro && <AuthorIntro value={displayedIntro} />}
    </Container>
  )
}
