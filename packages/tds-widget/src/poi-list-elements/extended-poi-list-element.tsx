import { useTranslation } from 'react-i18next'

import { useScrap } from '../scrap'
import {
  ExtendedResourceListElement,
  type ResourceListElementProps,
} from '../resource-list-elements'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { PoiListElementBaseProps, PoiListElementType } from './types'

interface ExtendedPoiListElementBaseProps<T extends PoiListElementType>
  extends PoiListElementBaseProps<T> {
  maxCommentLines?: number
  distance?: string | number
  distanceSuffix?: string
  isAdvertisement?: boolean
  notes?: (string | null | undefined)[]
}

export type ExtendedPoiListElementProps<T extends PoiListElementType> =
  ExtendedPoiListElementBaseProps<T> &
    Partial<Pick<ResourceListElementProps<T>, 'as'>>

export function ExtendedPoiListElement<T extends PoiListElementType>({
  poi,
  poi: {
    id,
    type,
    nameOverride,
    scraped,
    categories: categoriesWithGraphql,
    reviewsCount: reviewsCountWithGraphql,
    scrapsCount: scrapsCountWithGraphql,
    reviewsRating: reviewsRatingWithGraphql,
    source: {
      names,
      image,
      areas = [],
      categories,
      comment,
      reviewsCount: rawReviewsCount,
      scrapsCount: rawScrapsCount,
      reviewsRating: rawReviewsRating,
      vicinity,
    },
    distance,
  },
  onClick,
  distance: distanceOverride,
  distanceSuffix,
  maxCommentLines,
  as,
  isAdvertisement,
  notes,
  optimized,
}: ExtendedPoiListElementProps<T> & { optimized?: boolean }) {
  const { t } = useTranslation('triple-frontend')

  const { deriveCurrentStateAndCount } = useScrap()
  const {
    source: { starRating },
  } =
    type === 'hotel'
      ? poi
      : {
          source: { starRating: undefined },
        }
  const [area] = areas

  const [category] = (categoriesWithGraphql ?? categories) || []

  const { scrapsCount } = deriveCurrentStateAndCount({
    id,
    scraped,
    scrapsCount: scrapsCountWithGraphql ?? rawScrapsCount,
  })
  const reviewsCount = Number((reviewsCountWithGraphql ?? rawReviewsCount) || 0)
  const note = (
    notes || [
      starRating
        ? t('{{starRating}}성급', { starRating })
        : category
        ? category.name
        : null,
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
      reviewsRating={reviewsRatingWithGraphql ?? rawReviewsRating}
      scrapsCount={scrapsCount}
      onClick={onClick}
      maxCommentLines={maxCommentLines}
      isAdvertisement={isAdvertisement}
      optimized={optimized}
    />
  )
}
