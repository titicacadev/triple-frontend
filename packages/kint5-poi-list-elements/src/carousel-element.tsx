import { ReactNode } from 'react'
import {
  CarouselSizes,
  Carousel,
  Text,
  Container,
  Image,
  ThumbnailBorder,
} from '@titicaca/kint5-core-elements'
import { OverlayScrapButton } from '@titicaca/kint5-scrap-button'
import { FrameRatioAndSizes } from '@titicaca/type-definitions'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { getTypeNames } from './get-type-names'
import {
  PoiListElementBaseProps,
  ActionButtonElement,
  PoiListElementType,
} from './types'

const BORDER_RADIUS_PX = 12

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

  const name =
    nameOverride || names.primary || names.en || names.local || names.ko
  const regionName =
    regionNames?.primary ||
    regionNames?.en ||
    regionNames?.local ||
    regionNames?.ko

  return (
    <Carousel.Item
      size={carouselSize || 'small'}
      onClick={onClick}
      onImpress={onImpress}
      css={{ ':last-child': { marginRight: 16 } }}
    >
      <Image>
        <Container
          css={{
            borderRadius: BORDER_RADIUS_PX,
          }}
        >
          <Image.FixedRatioFrame
            frame={imageFrame || 'large'}
            borderRadius={BORDER_RADIUS_PX}
          >
            <ThumbnailBorder />
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
                  css={{ borderRadius: BORDER_RADIUS_PX }}
                />
              )
            ) : (
              <img
                src={POI_IMAGE_PLACEHOLDERS[type]}
                alt={name || ''}
                width={36}
                height={36}
                css={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </Image.FixedRatioFrame>
        </Container>
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
          color: 'var(--color-kint5-gray60)',
          marginTop: 8,
        }}
      >
        {description || getTypeNames(type)}
      </Text>
      <Text
        css={{
          fontSize: 13,
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
            top: 4,
            right: 4,
            padding: 4,
            zIndex: 1,
          }}
        >
          <OverlayScrapButton resource={poi} size={24} />
        </Container>
      )}

      {additionalInfo}
    </Carousel.Item>
  )
}

export default PoiCarouselElement
