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
import ExtendedResourceListElement from '@titicaca/resource-list-element'
import ScrapButton, { ScrapButtonProps } from '@titicaca/scrap-button'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'
import { TranslatedProperty, ImageMeta } from '@titicaca/type-definitions'

type PoiTypes = 'attraction' | 'restaurant' | 'hotel'

// TODO: attraction, restaourant와 hotel을 따로 정의하고 POIType으로 서로소 타입 만들기
export interface POI {
  id: string
  type: PoiTypes
  nameOverride?: string
  scraped: boolean
  source: {
    image?: ImageMeta
    names: TranslatedProperty
    regionId?: string
    areas?: { name: string }[]
    categories?: { name: string }[]
    comment?: string
    reviewsCount?: number
    scrapsCount?: number
    reviewsRating?: number
    starRating?: unknown
    pointGeolocation: {
      type: string
      coordinates: number[]
    }
  }
  distance?: number
  prices?: { nightlyBasePrice?: number; nightlyPrice?: number }
  priceInfo?: { nightlyBasePrice?: number; nightlyPrice?: number }
}

type ActionButtonElement = React.ReactNode

interface POIListElementBaseProps<T extends POI> {
  poi: T
  onClick?: React.MouseEventHandler<HTMLLIElement>
  onScrapedChange?: ScrapButtonProps<T>['onScrapedChange']
  resourceScraps?: { [key: string]: boolean }
}

interface PoiCarouselElementProps<T extends POI>
  extends POIListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
  description?: React.ReactNode
  additionalInfo?: React.ReactNode
  carouselSize?: CarouselSizes
  titleTopSpacing?: number
  imageFrame?: FrameRatioAndSizes
}

interface CompactPoiListElementProps<T extends POI>
  extends POIListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
}

interface ExtendedPoiListElementProps<T extends POI>
  extends POIListElementBaseProps<T> {
  tags?: [{ text: string; color: LabelColor; emphasized: boolean }]
  pricingNote?: string
  pricingDescription?: React.ReactNode
  priceLabelOverride?: string
  hideScrapButton?: boolean
  hideDiscountRate?: boolean
}

export type PoiListElementProps<T extends POI> =
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

export function PoiListElement<T extends POI>({
  compact,
  ...props
}: PoiListElementProps<T>) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}

export function PoiCarouselElement<T extends POI>({
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

class CompactPoiListElement<T extends POI> extends React.PureComponent<
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

class ExtendedPoiListElement<T extends POI> extends React.PureComponent<
  ExtendedPoiListElementProps<T>
> {
  render() {
    const {
      props: {
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
            starRating,
          },
          distance,
          prices,
          priceInfo,
        },
        pricingNote,
        pricingDescription,
        priceLabelOverride,
        onClick,
        onScrapedChange,
        resourceScraps,
        tags,
        hideScrapButton,
        hideDiscountRate,
      },
    } = this

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
        scraped={scraped}
        resource={this.props.poi}
        onScrapedChange={onScrapedChange}
        image={image}
        imagePlaceholder={POI_IMAGE_PLACEHOLDERS[type]}
        name={nameOverride || names.ko || names.en || names.local || undefined}
        comment={comment}
        distance={distance}
        note={note}
        reviewsCount={reviewsCount}
        reviewsRating={reviewsRating}
        scrapsCount={scrapsCount}
        basePrice={basePrice}
        salePrice={nightlyPrice}
        pricingNote={pricingNote}
        priceLabelOverride={priceLabelOverride}
        pricingDescription={pricingDescription}
        onClick={onClick}
        tags={tags}
        hideScrapButton={hideScrapButton || !resourceScraps}
        hideDiscountRate={hideDiscountRate}
      />
    )
  }
}
