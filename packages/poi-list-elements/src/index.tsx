import * as React from 'react'
import {
  Text,
  Image,
  Carousel,
  SquareImage,
  ResourceListItem,
  LabelColor,
  CarouselSizes,
  FrameRatioAndSizes,
} from '@titicaca/core-elements'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import ScrapButton, { ScrapButtonProps } from '@titicaca/scrap-button'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'
import { ListingPOI, ListingHotel } from '@titicaca/type-definitions'

type PoiTypes = ListingPOI['type']

type ActionButtonElement = React.ReactNode

interface POIListElementBaseProps<T extends ListingPOI> {
  poi: T
  onClick?: React.MouseEventHandler<HTMLLIElement>
  onScrapedChange?: ScrapButtonProps<T>['onScrapedChange']
  resourceScraps?: { [key: string]: boolean }
}

interface PoiCarouselElementProps<T extends ListingPOI>
  extends POIListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
  description?: React.ReactNode
  additionalInfo?: React.ReactNode
  carouselSize?: CarouselSizes
  titleTopSpacing?: number
  imageFrame?: FrameRatioAndSizes
}

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
  tags?: [{ text: string; color: LabelColor; emphasized: boolean }]
  pricingNote?: string
  pricingDescription?: React.ReactNode
  priceLabelOverride?: string
  isSoldOut?: boolean
  hideScrapButton?: boolean
  hideDiscountRate?: boolean
  maxCommentLines?: number
  distance?: string | number
  distanceSuffix?: string
}

type ExtendedPoiListElementProps<
  T extends ListingPOI
> = ExtendedPoiListElementBaseProps<T> &
  Partial<Pick<ResourceListElementProps<T>, 'as'>>

export type PoiListElementProps<T extends ListingPOI> =
  | ({ compact: true } & CompactPoiListElementProps<T>)
  | ({ compact?: false } & ExtendedPoiListElementProps<T>)

const TYPE_NAMES: { [key in PoiTypes]: string } = {
  attraction: '관광명소',
  restaurant: '음식점',
  hotel: '호텔',
}

const POI_IMAGE_PLACEHOLDERS: { [key in PoiTypes]: string } = {
  attraction: 'https://assets.triple.guide/images/ico-blank-see@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat@2x.png',
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel@2x.png',
}

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

export function PoiCarouselElement<T extends ListingPOI>({
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
}: PoiCarouselElementProps<T>) {
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
          id,
          type,
          nameOverride,
          scraped: initialScraped,
          source: { names, image },
        },
        onClick,
        onScrapedChange,
        resourceScraps,
      },
      state: { actionButtonWidth },
    } = this

    const { state: scraped } = deriveCurrentStateAndCount({
      initialState: initialScraped,
      initialCount: 0,
      currentState: (resourceScraps || {})[id],
    })

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
        ) : onScrapedChange && resourceScraps ? (
          <ScrapButton
            compact
            scraped={scraped}
            resource={this.props.poi}
            onScrapedChange={onScrapedChange}
          />
        ) : null}
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
          id,
          type,
          nameOverride,
          scraped: initialScraped,
          source: {
            names,
            image,
            areas = [],
            categories = [],
            comment,
            reviewsCount: rawReviewsCount,
            scrapsCount: initialScrapsCount,
            reviewsRating,
          },
          distance,
        },
        pricingNote,
        pricingDescription,
        priceLabelOverride,
        isSoldOut,
        onClick,
        onScrapedChange,
        resourceScraps,
        tags,
        hideScrapButton,
        hideDiscountRate,
        distance: distanceOverride,
        distanceSuffix,
        maxCommentLines = 0,
        as,
      },
    } = this

    const {
      source: { starRating },
      priceInfo,
      prices,
    } =
      type === 'hotel'
        ? (poi as ListingHotel)
        : {
            source: { starRating: undefined },
            priceInfo: undefined,
            prices: undefined,
          }

    const [area] = areas
    const [category] = categories

    const { state: scraped, count: scrapsCount } = deriveCurrentStateAndCount({
      initialState: initialScraped,
      initialCount: initialScrapsCount,
      currentState: (resourceScraps || {})[id],
    })
    const reviewsCount = Number(rawReviewsCount || 0)
    const note = [
      starRating ? `${starRating}성급` : category ? category.name : null,
      area ? area.name : null,
    ]
      .filter((v) => v)
      .join(' · ')

    /**
     * Deprecation: priceInfo 배포 후 prices 제거 예정
     */
    const { nightlyBasePrice, nightlyPrice } = priceInfo ||
      prices || {
        nightlyBasePrice: 0,
        nightlyPrice: 0,
      }

    const basePrice =
      nightlyBasePrice && nightlyPrice && nightlyBasePrice - nightlyPrice > 0
        ? nightlyBasePrice
        : null

    return (
      <ExtendedResourceListElement
        as={as}
        scraped={scraped}
        resource={this.props.poi}
        onScrapedChange={onScrapedChange}
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
        basePrice={basePrice}
        salePrice={nightlyPrice}
        pricingNote={pricingNote}
        priceLabelOverride={priceLabelOverride}
        pricingDescription={pricingDescription}
        isSoldOut={isSoldOut}
        onClick={onClick}
        tags={tags}
        hideScrapButton={hideScrapButton || !resourceScraps}
        hideDiscountRate={hideDiscountRate}
        maxCommentLines={maxCommentLines}
      />
    )
  }
}
