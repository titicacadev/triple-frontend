import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Container from '../elements/container'
import Text from '../elements/text'
import Rating from '../elements/rating'
import Image from '../elements/image'
import List from '../elements/list'
import Carousel from '../elements/carousel'
import ScrapButton from '../elements/scrap-button'
import { SquareImage, ResourceListItem } from '../elements/content-elements'

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
          src={(image && image.sizes.large.url) || POI_IMAGE_PLACEHOLDERS[type]}
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

const ExtendedPoiListItem = styled(List.Item)`
  min-height: 150px;
  padding: 20px 0;
  box-sizing: border-box;
`

const ExtendedPoiListImagePlaceholder = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  width: 90px;
  height: 110px;
  background-position: center;
  background-size: 40px 40px;
  background-image: url(${({ type }) => POI_IMAGE_PLACEHOLDERS[type]});
  background-color: #efefef;
  background-repeat: no-repeat;
  float: right;
  margin-left: 20px;
`

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
          },
          distance,
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

    return (
      <ExtendedPoiListItem onClick={onClick}>
        {image ? (
          <Image
            floated="right"
            size="small"
            width={90}
            src={image.sizes.large.url}
            margin={{ left: 20 }}
          />
        ) : (
          <ExtendedPoiListImagePlaceholder type={type} />
        )}
        <Text bold ellipsis size="large">
          {nameOverride || names.ko || names.en || names.local}
        </Text>
        <Text alpha={0.7} size="small" margin={{ top: 5 }}>
          {comment}
        </Text>
        {reviewsCount || scrapsCount ? (
          <Container margin={{ top: 5 }}>
            <>
              {reviewsCount ? (
                <Rating size="small" score={reviewsRating} />
              ) : null}
              <Text inline size="small" alpha={0.4}>
                {[
                  reviewsCount ? ` (${reviewsCount})` : null,
                  scrapsCount ? `저장${scrapsCount}` : null,
                ]
                  .filter((count) => count)
                  .join(' · ')}
              </Text>
            </>
          </Container>
        ) : null}
        <Container margin={{ top: 3 }}>
          {distance || distance === 0 ? (
            <Text inline color="blue" size="small" alpha={1}>
              {`${distance}m `}
            </Text>
          ) : null}
          {category ? (
            <Text inline size="small" alpha={0.4}>
              {category.name}
            </Text>
          ) : null}
          {category && area ? (
            <Text inline size="small" alpha={0.4}>
              {' · '}
            </Text>
          ) : null}
          {area ? (
            <Text inline size="small" alpha={0.4}>
              {area.name}
            </Text>
          ) : null}
        </Container>
        <ScrapButton
          top={23}
          scraped={scraped}
          resource={this.props.poi}
          onScrapedChange={onScrapedChange}
        />
      </ExtendedPoiListItem>
    )
  }
}

function deriveCurrentStateAndCount({
  initialState,
  initialCount,
  currentState,
}) {
  if (typeof initialState !== 'boolean' || typeof currentState !== 'boolean') {
    /* At least one of the status are unknown: Reduces to a bitwise OR operation */
    return {
      state: !!initialState || !!currentState,
      count: Number(initialCount || 0),
    }
  }

  return {
    state: currentState,
    count:
      initialState === currentState
        ? initialCount
        : currentState
          ? Number(initialCount || 0) + 1
          : Number(initialCount || 0) - 1,
  }
}

export function PoiListElement({ compact, ...props }) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}

const PoiCarouselImagePlaceholder = styled.div`
  border-radius: 6px;
  width: 140px;
  height: 140px;
  background-position: center;
  background-size: 40px 40px;
  background-image: url(${({ type }) => POI_IMAGE_PLACEHOLDERS[type]});
  background-color: #efefef;
  background-repeat: no-repeat;
`

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
        {image ? (
          <SquareImage src={image.sizes.large.url} />
        ) : (
          <PoiCarouselImagePlaceholder type={type} />
        )}
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
