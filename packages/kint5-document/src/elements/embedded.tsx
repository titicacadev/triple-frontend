import { ComponentType } from 'react'
import { Carousel, Container } from '@titicaca/kint5-core-elements'
import Kint5Media from '@titicaca/kint5-media'
import { ImageMeta } from '@titicaca/type-definitions'

import { TripleElementData, ElementSet } from '../types'
import { useImageClickHandler } from '../prop-context/image-click-handler'
import { useLinkClickHandler } from '../prop-context/link-click-handler'
import { useImageSource } from '../prop-context/image-source'
import { useMediaConfig } from '../prop-context/media-config'

import DocumentCarousel from './shared/document-carousel'
import generateClickHandler from './shared/generate-click-handler'
import { Text, MH3 } from './text'
import Links from './links'

function Compact<P extends { compact?: boolean }>(Component: ComponentType<P>) {
  return function CompactedComponent({ ...rest }: P) {
    return <Component compact {...rest} />
  }
}

function EmbeddedImage({
  value: {
    images: [image],
  },
  ...props
}: {
  value: {
    images: ImageMeta[]
  }
} & Parameters<typeof Container>[0]) {
  const onImageClick = useImageClickHandler()
  const onLinkClick = useLinkClickHandler()
  const ImageSource = useImageSource()
  const { optimized } = useMediaConfig()

  if (image) {
    const handleClick = generateClickHandler(onLinkClick, onImageClick)

    return (
      <Container {...props}>
        <Kint5Media
          frame="large"
          optimized={optimized}
          media={image}
          ImageSource={ImageSource}
          borderRadius={16}
          onClick={handleClick}
        />
      </Container>
    )
  }

  return null
}

const EMBEDDED_ELEMENTS: ElementSet = {
  heading2: Compact(MH3), // POI의 featuredContent에서 embedded entry의 제목이 heading2로 옵니다.
  heading3: Compact(MH3),
  text: Compact(Text),
  links: Compact(Links),
  images: EmbeddedImage,
}

export default function Embedded({
  value: { entries },
}: {
  value: {
    entries: TripleElementData[][]
  }
}) {
  const numOfImages = entries
    .flat()
    .filter((entry) => entry.type === 'images').length

  return (
    <DocumentCarousel
      margin={{ top: 20, left: 16, right: numOfImages > 1 ? 0 : 16 }}
    >
      {entries.map((elements, i) => (
        <Carousel.Item
          key={i}
          size="large"
          css={{ ':last-child': { marginRight: 16 } }}
        >
          {elements.map(({ type, value }, j) => {
            const Element = EMBEDDED_ELEMENTS[type]

            return Element && <Element key={j} value={value} embedded />
          })}
        </Carousel.Item>
      ))}
    </DocumentCarousel>
  )
}
