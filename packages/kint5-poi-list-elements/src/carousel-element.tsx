import { ReactNode } from 'react'
import {
  CarouselSizes,
  Carousel,
  Text,
  Container,
  Image,
} from '@titicaca/kint5-core-elements'
import { OverlayScrapButton } from '@titicaca/scrap-button'
import { FrameRatioAndSizes } from '@titicaca/type-definitions'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { getTypeNames } from './get-type-names'
import {
  PoiListElementBaseProps,
  ActionButtonElement,
  PoiListElementType,
} from './types'

function PoiCarouselElement<T extends PoiListElementType>({
  poi,
  poi: {
    type,
    region,
    nameOverride,
    source: { image, names, areas, vicinity },
  },
  onClick,
  actionButtonElement,
  description,
  additionalInfo = null,
  carouselSize,
  titleTopSpacing = 12,
  imageFrame,
  onImpress,
  optimized,
}: PoiListElementBaseProps<T> & {
  actionButtonElement?: ActionButtonElement
  description?: ReactNode
  additionalInfo?: ReactNode
  carouselSize?: CarouselSizes
  titleTopSpacing?: number
  imageFrame?: FrameRatioAndSizes
  onImpress?: () => void
  optimized?: boolean
}) {
  if (!poi) {
    return null
  }

  const { names: regionNames } = region?.source || {}

  const name = nameOverride || names.primary || names.en || names.local
  const regionName =
    regionNames?.primary || regionNames?.en || regionNames?.local

  return (
    <Carousel.Item
      size={carouselSize || 'small'}
      onClick={onClick}
      onImpress={onImpress}
      css={{ ':last-child': { marginRight: 16 } }}
    >
      <Image>
        <Image.FixedRatioFrame frame={imageFrame || 'large'} borderRadius={14}>
          {image ? (
            optimized ? (
              <Image.OptimizedImg
                cloudinaryId={image.cloudinaryId as string}
                cloudinaryBucket={image.cloudinaryBucket}
                alt={name || ''}
              />
            ) : (
              <Image.Img
                src={image.sizes.large.url}
                alt={name || ''}
                css={{ borderRadius: 14 }}
              />
            )
          ) : (
            <Image.Placeholder src={POI_IMAGE_PLACEHOLDERS[type]} />
          )}
        </Image.FixedRatioFrame>
      </Image>

      <Text
        ellipsis
        css={{ fontSize: 14, fontWeight: 700, marginTop: titleTopSpacing }}
      >
        {name}
      </Text>
      <Text
        css={{
          fontSize: 13,
          fontWeight: 400,
          color: 'var(--color-kint5-gray60)',
          marginTop: 8,
        }}
      >
        {description || getTypeNames(type)}
      </Text>
      <Text
        css={{
          fontSize: 13,
          fontWeight: 400,
          color: 'var(--color-kint5-gray60)',
          marginTop: 4,
        }}
      >
        {regionName
          ? areas?.[0]?.name
            ? `${regionName}(${areas?.[0]?.name})`
            : regionName
          : vicinity}
      </Text>

      {actionButtonElement || (
        <Container
          position="absolute"
          css={{
            top: '3px',
            right: '3px',
          }}
        >
          <OverlayScrapButton resource={poi} size={36} />
        </Container>
      )}

      {additionalInfo}
    </Carousel.Item>
  )
}

export default PoiCarouselElement
