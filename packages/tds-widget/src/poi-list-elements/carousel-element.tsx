import { ReactNode } from 'react'
import {
  Text,
  Container,
  Image,
  Carousel,
  CarouselSizes,
} from '@titicaca/tds-ui'
import { FrameRatioAndSizes, GuestModeType } from '@titicaca/type-definitions'
import { useTranslation } from '@titicaca/triple-web'

import { OverlayScrapButton } from '../scrap-button'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { getTypeNames } from './get-type-names'
import {
  PoiListElementBaseProps,
  ActionButtonElement,
  PoiListElementType,
} from './types'

export function PoiCarouselElement<T extends PoiListElementType>({
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
  titleTopSpacing = 10,
  imageFrame,
  onImpress,
  optimized,
  guestMode,
}: PoiListElementBaseProps<T> & {
  actionButtonElement?: ActionButtonElement
  description?: ReactNode
  additionalInfo?: ReactNode
  carouselSize?: CarouselSizes
  titleTopSpacing?: number
  imageFrame?: FrameRatioAndSizes
  onImpress?: () => void
  optimized?: boolean
  guestMode?: GuestModeType
}) {
  const t = useTranslation()

  if (!poi) {
    return null
  }

  const { names: regionNames } = region?.source || {}

  const name =
    nameOverride || names.primary || names.ko || names.en || names.local
  const regionName =
    regionNames?.primary ||
    regionNames?.ko ||
    regionNames?.en ||
    regionNames?.local
  const ActionButton = actionButtonElement || (
    <Container
      position="absolute"
      css={{
        top: '3px',
        right: '3px',
      }}
    >
      <OverlayScrapButton resource={poi} size={36} />
    </Container>
  )

  return (
    <Carousel.Item
      size={carouselSize || 'small'}
      onClick={onClick}
      onImpress={onImpress}
    >
      <Image>
        <Image.FixedRatioFrame frame={imageFrame || 'large'}>
          {image ? (
            optimized ? (
              <Image.OptimizedImg
                cloudinaryId={image.cloudinaryId as string}
                cloudinaryBucket={image.cloudinaryBucket}
                alt={name || ''}
              />
            ) : (
              <Image.Img src={image.sizes.large.url} alt={name || ''} />
            )
          ) : (
            <Image.Placeholder src={POI_IMAGE_PLACEHOLDERS[type]} />
          )}
        </Image.FixedRatioFrame>
      </Image>

      <Text bold ellipsis alpha={1} margin={{ top: titleTopSpacing }}>
        {name}
      </Text>
      <Text size="tiny" alpha={0.7} margin={{ top: 2 }}>
        {description || t(getTypeNames(type))}
      </Text>
      <Text size="tiny" alpha={0.7} margin={{ top: 2 }}>
        {regionName
          ? areas?.[0]?.name
            ? `${regionName}(${areas?.[0]?.name})`
            : regionName
          : vicinity}
      </Text>

      {!guestMode ? ActionButton : null}

      {additionalInfo}
    </Carousel.Item>
  )
}
