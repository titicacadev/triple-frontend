import React from 'react'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { useScrapsContext } from '@titicaca/react-contexts'
import { PoiGQL } from '@titicaca/graphql-type-definitions'
import { ImageMeta } from '@titicaca/type-definitions'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { POIListElementBaseProps } from './types'

interface ExtendedPoiListElementBaseProps<T extends PoiGQL>
  extends POIListElementBaseProps<T> {
  hideScrapButton?: boolean
  maxCommentLines?: number
  distance?: string | number
  distanceSuffix?: string
  isAdvertisement?: boolean
  notes?: (string | null | undefined)[]
}

export type ExtendedPoiListElementProps<
  T extends PoiGQL
> = ExtendedPoiListElementBaseProps<T> &
  Partial<Pick<ResourceListElementProps<T>, 'as'>>

export function ExtendedPoiListElement<T extends PoiGQL>({
  poi,
  poi: {
    id,
    type,
    nameOverride,
    categories = [],
    scraped,
    reviewsCount: reviewsCountWithGraphql,
    scrapsCount: scrapsCountWithGraphql,
    reviewsRating: reviewsRatingWithGraphql,
    source: {
      names,
      image,
      areas = [],
      comment,
      reviewsCount: rawReviewsCount,
      scrapsCount: rawScrapsCount,
      reviewsRating: rawReviewsRating,
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
}: ExtendedPoiListElementProps<T> & {
  optimized?: boolean
  poi: {
    distance?: number | string
    scraped?: boolean
    source: PoiGQL['source'] & {
      scrapsCount?: number
      reviewsCount?: number
      reviewsRating?: number
    }
  }
}) {
  const { deriveCurrentStateAndCount } = useScrapsContext()
  const {
    source: { starRating },
  } =
    type === 'hotel'
      ? poi
      : {
          source: { starRating: undefined },
        }
  const [area] = areas

  const { scrapsCount } = deriveCurrentStateAndCount({
    id,
    scraped,
    scrapsCount: scrapsCountWithGraphql ?? rawScrapsCount,
  })
  const reviewsCount = Number((reviewsCountWithGraphql ?? rawReviewsCount) || 0)
  const note = (
    notes || [
      starRating ? `${starRating}성급` : categories?.[0]?.name || null,
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
      image={image as ImageMeta}
      imagePlaceholder={POI_IMAGE_PLACEHOLDERS[type]}
      name={nameOverride || names.ko || names.en || names.local || undefined}
      comment={comment as string}
      distance={distanceOverride || distance}
      distanceSuffix={distanceSuffix}
      note={note}
      reviewsCount={reviewsCount}
      reviewsRating={reviewsRatingWithGraphql ?? rawReviewsRating}
      scrapsCount={scrapsCount}
      onClick={onClick}
      hideScrapButton={hideScrapButton}
      maxCommentLines={maxCommentLines}
      isAdvertisement={isAdvertisement}
      optimized={optimized}
    />
  )
}
