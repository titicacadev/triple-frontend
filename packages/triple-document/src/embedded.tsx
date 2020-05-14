import React from 'react'
import { ImageSourceType, Carousel, Container } from '@titicaca/core-elements'
import TripleMedia, { MediaMeta } from '@titicaca/triple-media'

import DocumentCarousel from './document-carousel'
import {
  TripleElementData,
  LinkEventHandler,
  ImageEventHandler,
  ElementSet,
} from './types'
import Heading from './heading-hoc'
import generateClickHandler from './generate-click-handler'
import TextElement from './text-element'
import Links from './links'
import { MH3 } from './margin-headings'

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
  ...props
}: {
  value: {
    images: MediaMeta[]
  }
  onImageClick: ImageEventHandler
  onLinkClick: LinkEventHandler
  ImageSource: ImageSourceType
} & Parameters<typeof Container>[0]) {
  if (image) {
    const handleClick = generateClickHandler(onLinkClick, onImageClick)

    return (
      <Container margin={{ top: 10 }} {...props}>
        <TripleMedia
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
  heading2: Compact(Heading(MH3)), // POI의 featuredContent에서 embedded entry의 제목이 heading2로 옵니다.
  heading3: Compact(Heading(MH3)),
  text: Compact(TextElement),
  links: Compact(Links),
  images: EmbeddedImage,
}

export default function Embedded({
  value: { entries },
  onLinkClick,
  onImageClick,
  ImageSource,
}: {
  value: {
    entries: TripleElementData[][]
  }
  onLinkClick: LinkEventHandler
  onImageClick: ImageEventHandler
  ImageSource: ImageSourceType
}) {
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
