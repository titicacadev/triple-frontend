import React from 'react'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { ListingPOI, ListingHotel } from '@titicaca/type-definitions'

import { POI_IMAGE_PLACEHOLDERS } from './constants'
import { POIListElementBaseProps } from './types'
import {
  CompactPoiListElement,
  CompactPoiListElementProps,
} from './compact-poi-list-element'

export { default as POICardElement } from './poi-card-element'
export { default as PoiCarouselElement } from './carousel-element'

interface ExtendedPoiListElementBaseProps<T extends ListingPOI>
  extends POIListElementBaseProps<T> {
  hideScrapButton?: boolean
  maxCommentLines?: number
  distance?: string | number
  distanceSuffix?: string
  isAdvertisement?: boolean
  notes?: string[]
}

type ExtendedPoiListElementProps<
  T extends ListingPOI
> = ExtendedPoiListElementBaseProps<T> &
  Partial<Pick<ResourceListElementProps<T>, 'as'>>

export type PoiListElementProps<T extends ListingPOI> =
  | ({ compact: true } & CompactPoiListElementProps<T>)
  | ({ compact?: false } & ExtendedPoiListElementProps<T>)

export function PoiListElement<T extends ListingPOI>({
  compact,
  ...props
}: PoiListElementProps<T>) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}

class ExtendedPoiListElement<T extends ListingPOI> extends React.PureComponent<
  ExtendedPoiListElementProps<T>
> {
  render() {
    const {
      props: {
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
      },
    } = this

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
        resource={this.props.poi}
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
}
