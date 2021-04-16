import React from 'react'
import { ImageSourceType, Carousel, Container } from '@titicaca/core-elements'
import TripleMedia from '@titicaca/triple-media'
import { ImageMeta } from '@titicaca/type-definitions'

import {
  TripleElementData,
  LinkEventHandler,
  ImageEventHandler,
  ElementSet,
} from '../types'
import { useImageClickHandler } from '../prop-context/image-click-handler'
import { useLinkClickHandler } from '../prop-context/link-click-handler'
import { useImageSource } from '../prop-context/image-source'

import DocumentCarousel from './shared/document-carousel'
import generateClickHandler from './shared/generate-click-handler'
import { Text, MH3 } from './text'
import Links from './links'

function Compact<P extends { compact?: boolean }>(
  Component: React.ComponentType<P>,
) {
  return function CompactedComponent(props: P) {
    return <Component compact {...props} />
  }
}

function EmbeddedImage({
  value: {
    images: [image],
  },
  onImageClick,
  onLinkClick,
  ImageSource,
  optimized,
  ...props
}: {
  value: {
    images: ImageMeta[]
  }
  onImageClick: ImageEventHandler
  onLinkClick: LinkEventHandler
  ImageSource: ImageSourceType
  optimized?: boolean
} & Parameters<typeof Container>[0]) {
  if (image) {
    const handleClick = generateClickHandler(onLinkClick, onImageClick)

    return (
      <Container margin={{ top: 10 }} {...props}>
        <TripleMedia
          optimized={optimized}
          media={image}
          ImageSource={ImageSource}
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
  optimized,
}: {
  value: {
    entries: TripleElementData[][]
  }
  optimized?: boolean
}) {
  const onImageClick = useImageClickHandler()
  const onLinkClick = useLinkClickHandler()
  const ImageSource = useImageSource()

  return (
    <DocumentCarousel margin={{ top: 20 }}>
      {entries.map((elements, i) => (
        <Carousel.Item key={i} size="large">
          {elements.map(({ type, value }, j) => {
            const Element = EMBEDDED_ELEMENTS[type]

            return (
              Element && (
                <Element
                  key={j}
                  value={value}
                  onLinkClick={onLinkClick}
                  onImageClick={onImageClick}
                  ImageSource={ImageSource}
                  optimized={optimized}
                  {...(j === 0 ? { margin: { top: 0 } } : {})}
                />
              )
            )
          })}
        </Carousel.Item>
      ))}
    </DocumentCarousel>
  )
}
