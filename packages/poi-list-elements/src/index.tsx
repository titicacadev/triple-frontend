import * as React from 'react'
import {
  Text,
  Image,
  Carousel,
  SquareImage,
  ResourceListItem,
  LabelColor,
} from '@titicaca/core-elements'
import ExtendedResourceListElement from '@titicaca/resource-list-element'
import ScrapButton from '@titicaca/scrap-button'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'

type PoiTypes = 'attraction' | 'restaurant' | 'hotel'

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
}: {
  poi?: any
  onClick?: (e?: React.SyntheticEvent) => any
  actionButtonElement?: React.ReactElement
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
  resourceScraps?: any
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

    const name = nameOverride || names.ko || names.en || names.local

    return (
      <Carousel.Item size="small" onClick={onClick}>
        <Image
          frame="large"
          asPlaceholder={!image}
          src={image ? image.sizes.large.url : POI_IMAGE_PLACEHOLDERS[type]}
          alt={name}
        />
        <Text bold ellipsis alpha={1} margin={{ top: 8 }}>
          {name}
        </Text>
        <Text size="tiny" alpha={0.7} margin={{ top: 2 }}>
          {TYPE_NAMES[type]}
        </Text>
        {actionButtonElement || (
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

class CompactPoiListElement extends React.PureComponent<{
  actionButtonElement?: any
  poi?: any
  onClick?: (e?: React.SyntheticEvent) => any
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
  resourceScraps?: any
}> {
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

    const name = nameOverride || names.ko || names.en || names.local

    return (
      <ResourceListItem onClick={onClick}>
        <SquareImage
          floated="left"
          size="small"
          src={
            (image && image.sizes.large.url) ||
            POI_IMAGE_PLACEHOLDERS_SMALL[type]
          }
          alt={name}
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

class ExtendedPoiListElement extends React.PureComponent<{
  poi?: any
  onClick?: (e?: React.SyntheticEvent) => any
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
  resourceScraps?: any
  tags?: [{ text: string; color: LabelColor; emphasized: boolean }]
  pricingNote?: string
}> {
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
        pricingNote,
        onClick,
        onScrapedChange,
        resourceScraps,
        tags,
      },
    } = this

    const [area] = areas || [undefined]
    const [category] = categories || [undefined]
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

    const { nightlyBasePrice, nightlyPrice } = prices || {
      nightlyBasePrice: 0,
      nightlyPrice: 0,
    }

    const basePrice =
      nightlyBasePrice && nightlyPrice && nightlyBasePrice - nightlyPrice > 0
        ? nightlyBasePrice
        : null

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
        basePrice={basePrice}
        salePrice={nightlyPrice}
        pricingNote={basePrice > 0 && pricingNote}
        onScrapedChange={onScrapedChange}
        onClick={onClick}
        tags={tags}
      />
    )
  }
}
