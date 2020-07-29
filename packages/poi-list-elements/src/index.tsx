import * as React from 'react'
import { Text, SquareImage, ResourceListItem } from '@titicaca/core-elements'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { CompactScrapButton } from '@titicaca/scrap-button'
import { ListingPOI, ListingHotel } from '@titicaca/type-definitions'

import { TYPE_NAMES, POI_IMAGE_PLACEHOLDERS } from './constants'
import { POIListElementBaseProps, ActionButtonElement } from './types'

export { default as POICardElement } from './poi-card-element'
export { default as PoiCarouselElement } from './carousel-element'

type PoiTypes = ListingPOI['type']

interface CompactPoiListElementBaseProps<T extends ListingPOI>
  extends POIListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
}

type CompactPoiListElementProps<
  T extends ListingPOI
> = CompactPoiListElementBaseProps<T> &
  Partial<Pick<Parameters<typeof ResourceListItem>['0'], 'as'>>

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

const POI_IMAGE_PLACEHOLDERS_SMALL: { [key in PoiTypes]: string } = {
  attraction: 'https://assets.triple.guide/images/ico-blank-see-small@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat-small@2x.png',
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel-small@2x.png',
}

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

class CompactPoiListElement<T extends ListingPOI> extends React.PureComponent<
  CompactPoiListElementProps<T>,
  { actionButtonWidth: number }
> {
  state = { actionButtonWidth: 34 }

  setActionButtonRef = (ref: HTMLDivElement) => {
    if (ref && ref.children[0]) {
      const {
        state: { actionButtonWidth },
      } = this
      const newWidth = ref.children[0].clientWidth

      if (newWidth !== actionButtonWidth) {
        this.setState({ actionButtonWidth: newWidth })
      }
    }
  }

  render() {
    const {
      props: {
        actionButtonElement,
        poi: {
          type,
          nameOverride,
          source: { names, image },
        },
        onClick,
      },
      state: { actionButtonWidth },
    } = this

    const name = nameOverride || names.ko || names.en || names.local

    return (
      <ResourceListItem onClick={onClick}>
        <SquareImage
          floated="left"
          size="small"
          src={
            image ? image.sizes.large.url : POI_IMAGE_PLACEHOLDERS_SMALL[type]
          }
          alt={name || ''}
        />
        <Text
          bold
          ellipsis
          alpha={1}
          margin={{ left: 50, right: actionButtonWidth }}
        >
          {name}
        </Text>
        <Text size="tiny" alpha={0.7} margin={{ top: 4, left: 50 }}>
          {TYPE_NAMES[type]}
        </Text>

        {actionButtonElement ? (
          <div ref={this.setActionButtonRef}>{actionButtonElement}</div>
        ) : (
          <CompactScrapButton resource={this.props.poi} />
        )}
      </ResourceListItem>
    )
  }
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
