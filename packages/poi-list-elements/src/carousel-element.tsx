import React from 'react'
import {
  CarouselSizes,
  FrameRatioAndSizes,
  Image,
  Carousel,
  Text,
} from '@titicaca/core-elements'
import ScrapButton from '@titicaca/scrap-button'
import { ListingPOI } from '@titicaca/type-definitions'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'

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
  onScrapedChange,
  resourceScraps,
  description,
  additionalInfo = null,
  carouselSize,
  titleTopSpacing = 10,
  imageFrame,
}: POIListElementBaseProps<T> & {
  actionButtonElement?: ActionButtonElement
  description?: React.ReactNode
  additionalInfo?: React.ReactNode
  carouselSize?: CarouselSizes
  titleTopSpacing?: number
  imageFrame?: FrameRatioAndSizes
}) {
  if (poi) {
    const {
      id,
      type,
      nameOverride,
      scraped: initialScraped,
      source: { image, names },
    } = poi

    const { state: scraped } = deriveCurrentStateAndCount({
      initialState: initialScraped,
      initialCount: 0,
      currentState: (resourceScraps || {})[id],
    })

    const name = nameOverride || names.ko || names.en || names.local

    return (
      <Carousel.Item size={carouselSize || 'small'} onClick={onClick}>
        <Image
          frame={imageFrame || 'large'}
          asPlaceholder={!image}
          src={image ? image.sizes.large.url : POI_IMAGE_PLACEHOLDERS[type]}
          alt={name || ''}
        />
        <Text bold ellipsis alpha={1} margin={{ top: titleTopSpacing }}>
          {name}
        </Text>
        <Text size="tiny" alpha={0.7} margin={{ top: 2 }}>
          {description || TYPE_NAMES[type]}
        </Text>

        {actionButtonElement ||
          (onScrapedChange && resourceScraps ? (
            <ScrapButton
              scraped={scraped}
              resource={poi}
              onScrapedChange={onScrapedChange}
            />
          ) : null)}

        {additionalInfo}
      </Carousel.Item>
    )
  }

  return null
}
