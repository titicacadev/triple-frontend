import React, { PureComponent } from 'react'
import Text from '../elements/text'
import Image from '../elements/image'
import Carousel from '../elements/carousel'
import ScrapButton from '../elements/scrap-button'
import { SquareImage, ResourceListItem } from '../elements/content-elements'
import { deriveCurrentStateAndCount } from '../utilities'
import { ExtendedResourceListElement } from './common/resource-list-element'

const TYPE_NAMES = {
  attraction: '관광명소',
  restaurant: '음식점',
  hotel: '호텔',
}

const POI_IMAGE_PLACEHOLDERS = {
  attraction: 'https://assets.triple.guide/images/ico-blank-see@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat@2x.png',
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel@2x.png',
}

const POI_IMAGE_PLACEHOLDERS_SMALL = {
  attraction: 'https://assets.triple.guide/images/ico-blank-see-small@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat-small@2x.png',
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel-small@2x.png',
}

export function PoiListElement({ compact, ...props }) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}

export function PoiCarouselElement({
  poi,
  onClick,
  actionButtonElement,
  onScrapedChange,
  resourceScraps,
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
      currentState: resourceScraps[id],
    })

    return (
      <Carousel.Item size="small" onClick={onClick}>
        <Image
          frame="large"
          asPlaceholder={!image}
          src={image ? image.sizes.large.url : POI_IMAGE_PLACEHOLDERS[type]}
        />
        <Text bold ellipsis alpha={1} margin={{ top: 8 }}>
          {nameOverride || names.ko || names.en || names.local}
        </Text>
        <Text size="tiny" alpha={0.7} margin={{ top: 2 }}>
          {TYPE_NAMES[type]}
        </Text>
        {actionButtonElement ? (
          actionButtonElement
        ) : (
          <ScrapButton
            scraped={scraped}
            resource={poi}
            onScrapedChange={onScrapedChange}
          />
        )}
      </Carousel.Item>
    )
  }
}

class CompactPoiListElement extends PureComponent {
  state = { actionButtonWidth: 34 }

  setActionButtonRef = (ref) => {
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
      currentState: resourceScraps[id],
    })

    return (
      <ResourceListItem onClick={onClick}>
        <SquareImage
          floated="left"
          size="small"
          src={
            (image && image.sizes.large.url) ||
            POI_IMAGE_PLACEHOLDERS_SMALL[type]
          }
        />
        <Text
          bold
          ellipsis
          alpha={1}
          margin={{ left: 50, right: actionButtonWidth }}
        >
          {nameOverride || names.ko || names.en || names.local}
        </Text>
        <Text size="tiny" alpha={0.7} margin={{ top: 4, left: 50 }}>
          {TYPE_NAMES[type]}
        </Text>
        {actionButtonElement ? (
          <div ref={this.setActionButtonRef}>{actionButtonElement}</div>
        ) : (
          <ScrapButton
            compact
            scraped={scraped}
            resource={this.props.poi}
            onScrapedChange={onScrapedChange}
          />
        )}
      </ResourceListItem>
    )
  }
}

class ExtendedPoiListElement extends PureComponent {
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
            areas,
            categories,
            comment,
            reviewsCount: rawReviewsCount,
            scrapsCount: initialScrapsCount,
            reviewsRating,
            starRating,
          },
          distance,
          prices,
        },
        onClick,
        onScrapedChange,
        resourceScraps,
      },
    } = this

    const [area] = areas || []
    const [category] = categories || []
    const { state: scraped, count: scrapsCount } = deriveCurrentStateAndCount({
      initialState: initialScraped,
      initialCount: initialScrapsCount,
      currentState: resourceScraps[id],
    })
    const reviewsCount = Number(rawReviewsCount || 0)
    const note = [
      starRating ? `${starRating}성급` : category ? category.name : null,
      area ? area.name : null,
    ]
      .filter((v) => v)
      .join(' · ')

    const {
      nightlyBasePrice,
      nightlyPrice,
      nightlyPriceHotelPromotionApplied,
    } = prices || {}

    return (
      <ExtendedResourceListElement
        resource={this.props.poi}
        image={image}
        imagePlaceholder={POI_IMAGE_PLACEHOLDERS[type]}
        name={nameOverride || names.ko || names.en || names.local}
        comment={comment}
        distance={distance}
        note={note}
        reviewsCount={reviewsCount}
        reviewsRating={reviewsRating}
        scraped={scraped}
        scrapsCount={scrapsCount}
        basePrice={nightlyBasePrice}
        salePrice={
          nightlyPriceHotelPromotionApplied && nightlyPrice
            ? Math.min(nightlyPriceHotelPromotionApplied, nightlyPrice)
            : nightlyPriceHotelPromotionApplied || nightlyPrice
        }
        pricingNote={nightlyPrice ? '세금 및 기타 요금 포함' : null}
        onScrapedChange={onScrapedChange}
        onClick={onClick}
      />
    )
  }
}
