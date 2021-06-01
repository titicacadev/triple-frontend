import React from 'react'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { PoiResponse } from '@titicaca/type-definitions'
import { useScrapsContext } from '@titicaca/react-contexts'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { POIListElementBaseProps } from './types'

interface ExtendedPoiListElementBaseProps<T extends PoiResponse>
  extends POIListElementBaseProps<T> {
  hideScrapButton?: boolean
  maxCommentLines?: number
  distance?: string | number
  distanceSuffix?: string
  isAdvertisement?: boolean
  notes?: (string | null | undefined)[]
}

export type ExtendedPoiListElementProps<
  T extends PoiResponse
> = ExtendedPoiListElementBaseProps<T> &
  Partial<Pick<ResourceListElementProps<T>, 'as'>>

export function ExtendedPoiListElement<T extends PoiResponse>({
  poi,
  poi: {
    id,
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
      scrapsCount: rawScrapsCount,
      reviewsRating,
      vicinity,
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
  optimized,
}: ExtendedPoiListElementProps<T> & { optimized?: boolean }) {
  const { deriveCurrentStateAndCount } = useScrapsContext()
  const {
    source: { starRating },
  } =
    type === 'hotel'
      ? (poi as PoiResponse)
      : {
          source: { starRating: undefined },
        }
  const [area] = areas
  const [category] = categories

  const { scrapsCount } = deriveCurrentStateAndCount({
    id,
    scraped,
    scrapsCount: rawScrapsCount,
  })
  const reviewsCount = Number(rawReviewsCount || 0)
  const note = (
    notes || [
      starRating ? `${starRating}성급` : category ? category.name : null,
      area ? area.name : vicinity,
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
      optimized={optimized}
    />
  )
}
