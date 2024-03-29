import { ComponentType, ElementType } from 'react'
import { Container } from '@titicaca/kint5-core-elements'
import Kint5Media from '@titicaca/kint5-media'
import { ImageMeta } from '@titicaca/type-definitions'

import { TripleElementData } from '../types'
import { useImageClickHandler } from '../prop-context/image-click-handler'
import { useLinkClickHandler } from '../prop-context/link-click-handler'
import { useImageSource } from '../prop-context/image-source'
import { useMediaConfig } from '../prop-context/media-config'

import DocumentCarousel from './shared/document-carousel'
import generateClickHandler from './shared/generate-click-handler'
import { Text, MH3 } from './text'
import Links from './links'

import { ElementSet } from './index'

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

type ElmbeddedElementType =
  | 'heading2'
  | 'heading3'
  | 'text'
  | 'links'
  | 'images'

const EMBEDDED_ELEMENTS: {
  [key in keyof Pick<ElementSet, ElmbeddedElementType>]: ElementType
} = {
  heading2: Compact(MH3), // POI의 featuredContent에서 embedded entry의 제목이 heading2로 옵니다.
  heading3: Compact(MH3),
  text: Compact(Text),
  links: Compact(Links),
  images: EmbeddedImage,
} as const

export default function Embedded({
  value: { entries },
}: {
  value: {
    entries: TripleElementData[][]
  }
}) {
  const numOfEntries = entries.length

  return (
    <DocumentCarousel
      css={{
        marginTop: 20,
        paddingLeft: 16,
        marginRight: numOfEntries > 1 ? 0 : 16,
        ...(numOfEntries > 1 && {
          '::after': {
            content: '""',
            display: 'inline-block',
            width: 16,
            height: 1,
          },
        }),
      }}
    >
      {entries.map((elements, i) => (
        <li
          key={i}
          css={{
            display: 'inline-block',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            width: '100%',
            ':not(:first-child)': {
              marginLeft: 12,
            },
            ...(numOfEntries > 1 && { maxWidth: 320 }),
          }}
        >
          {elements.map(({ type, value }, j) => {
            if (!isEmbeddedElementType(type)) {
              return null
            }

            const Element = EMBEDDED_ELEMENTS[type]
            return <Element key={j} value={value} embedded />
          })}
        </li>
      ))}
    </DocumentCarousel>
  )
}

function isEmbeddedElementType(type: string): type is ElmbeddedElementType {
  return type in EMBEDDED_ELEMENTS
}
