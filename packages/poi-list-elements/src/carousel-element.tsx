import React from 'react'
import {
  CarouselSizes,
  FrameRatioAndSizes,
  Carousel,
  Text,
  Container,
  ImageV2,
} from '@titicaca/core-elements'
import { RegularScrapButton } from '@titicaca/scrap-button'
import { ListingPOI } from '@titicaca/type-definitions'

import { POI_IMAGE_PLACEHOLDERS, TYPE_NAMES } from './constants'
import { POIListElementBaseProps, ActionButtonElement } from './types'

export default function PoiCarouselElement<
  T extends Pick<ListingPOI, 'id' | 'type' | 'nameOverride' | 'scraped'> & {
    source: Pick<ListingPOI['source'], 'names' | 'image'>
  }
>({
  poi,
  onClick,
  actionButtonElement,
  description,
  additionalInfo = null,
  carouselSize,
  titleTopSpacing = 10,
  imageFrame,
  onImpress,
}: POIListElementBaseProps<T> & {
  actionButtonElement?: ActionButtonElement
  description?: React.ReactNode
  additionalInfo?: React.ReactNode
  carouselSize?: CarouselSizes
  titleTopSpacing?: number
  imageFrame?: FrameRatioAndSizes
  onImpress?: () => void
}) {
  if (!poi) {
    return null
  }

  const {
    type,
    nameOverride,
    source: { image, names },
  } = poi

  const name = nameOverride || names.ko || names.en || names.local

  return (
    <Carousel.Item
      size={carouselSize || 'small'}
      onClick={onClick}
      onImpress={onImpress}
    >
      <ImageV2>
        <ImageV2.FixedRatioFrame frame={imageFrame || 'large'}>
          {image ? (
            <ImageV2.Img src={image.sizes.large.url} alt={name || ''} />
          ) : (
            <ImageV2.Placeholder src={POI_IMAGE_PLACEHOLDERS[type]} />
          )}
        </ImageV2.FixedRatioFrame>
      </ImageV2>

      <Text bold ellipsis alpha={1} margin={{ top: titleTopSpacing }}>
        {name}
      </Text>
      <Text size="tiny" alpha={0.7} margin={{ top: 2 }}>
        {description || TYPE_NAMES[type]}
      </Text>

      {actionButtonElement || (
        <Container position="absolute" positioning={{ top: 3, right: 3 }}>
          <RegularScrapButton resource={poi} />
        </Container>
      )}

      {additionalInfo}
    </Carousel.Item>
  )
}
