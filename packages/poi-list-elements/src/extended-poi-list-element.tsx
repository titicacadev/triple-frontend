import React from 'react'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { ListingPOI, ListingHotel } from '@titicaca/type-definitions'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { POIListElementBaseProps } from './types'

interface ExtendedPoiListElementBaseProps<T extends ListingPOI>
  extends POIListElementBaseProps<T> {
  hideScrapButton?: boolean
  maxCommentLines?: number
  distance?: string | number
  distanceSuffix?: string
  isAdvertisement?: boolean
  notes?: string[]
}

export type ExtendedPoiListElementProps<
  T extends ListingPOI
> = ExtendedPoiListElementBaseProps<T> &
  Partial<Pick<ResourceListElementProps<T>, 'as'>>

export function ExtendedPoiListElement<T extends ListingPOI>({
  poi,
  poi: {
    type,
    nameOverride,
    scraped,
    source: {
      names,
      image,
      areas = [],
      categories = [],
      comment,
      reviewsCount: rawReviewsCount,
      scrapsCount,
      reviewsRating,
    },
    distance,
  },
  onClick,
  hideScrapButton,
  distance: distanceOverride,
  distanceSuffix,
  maxCommentLines,
  as,
  isAdvertisement,
  notes,
}: ExtendedPoiListElementProps<T>) {
  const {
    source: { starRating },
  } =
    type === 'hotel'
      ? (poi as ListingHotel)
      : {
          source: { starRating: undefined },
        }

  const [area] = areas
  const [category] = categories

  const reviewsCount = Number(rawReviewsCount || 0)
  const note = (
    notes || [
      starRating ? `${starRating}성급` : category ? category.name : null,
      area ? area.name : null,
    ]
  )
    .filter((v) => v)
    .join(' · ')

  return (
    <ExtendedResourceListElement
      as={as}
      scraped={scraped}
      resource={poi}
      image={image}
      imagePlaceholder={POI_IMAGE_PLACEHOLDERS[type]}
      name={nameOverride || names.ko || names.en || names.local || undefined}
      comment={comment}
      distance={distanceOverride || distance}
      distanceSuffix={distanceSuffix}
      note={note}
      reviewsCount={reviewsCount}
      reviewsRating={reviewsRating}
      scrapsCount={scrapsCount}
      onClick={onClick}
      hideScrapButton={hideScrapButton}
      maxCommentLines={maxCommentLines}
      isAdvertisement={isAdvertisement}
    />
  )
}
