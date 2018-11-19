import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Container from '../elements/container'
import Text from '../elements/text'
import Rating from '../elements/rating'
import Image from '../elements/image'
import List from '../elements/list'
import Carousel from '../elements/carousel'
import { SquareImage, ResourceListItem } from '../elements/content-elements'

const TYPE_NAMES = {
  attraction: '관광명소',
  restaurant: '음식점',
  hotel: '호텔',
}

const POI_IMAGE_PLACEHOLDER =
  'https://assets.triple.guide/images/ico-blank-see@2x.png'

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
          src={(image && image.sizes.large.url) || POI_IMAGE_PLACEHOLDER}
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
            poi={this.props.poi}
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

class ExtendedPoiListElement extends PureComponent {
  render() {
    const {
      props: {
        poi: {
          id,
          nameOverride,
          scraped: initialScraped,
          source: {
            names,
            image,
            areas,
            categories,
            comment,
            reviewsCount,
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

    return (
      <ExtendedPoiListItem onClick={onClick}>
        <Image
          floated="right"
          size="small"
          width={90}
          src={image && image.sizes.large.url}
          margin={{ left: 20 }}
        />
        <Text bold ellipsis size="large">
          {nameOverride || names.ko || names.en || names.local}
        </Text>
        <Text alpha={0.7} size="small" margin={{ top: 5 }}>
          {comment}
        </Text>
        {(reviewsCount || scrapsCount) && (
          <Container margin={{ top: 5 }}>
            <>
              {reviewsCount && <Rating size="small" score={reviewsRating} />}
              <Text inline size="small" alpha={0.4}>
                {[
                  reviewsCount && ` (${reviewsCount})`,
                  scrapsCount && `저장${scrapsCount}`,
                ]
                  .filter((count) => count)
                  .join(' . ')}
              </Text>
            </>
          </Container>
        )}
        <Container margin={{ top: 3 }}>
          {distance || distance === 0 ? (
            <Text inline color="blue" size="small" alpha={1}>
              {`${distance}m `}
            </Text>
          ) : null}
          {category && (
            <Text inline size="small" alpha={0.4}>
              {category.name}
            </Text>
          )}
          {category &&
            area && (
              <Text inline size="small" alpha={0.4}>
                {' · '}
              </Text>
            )}
          {area && (
            <Text inline size="small" alpha={0.4}>
              {area.name}
            </Text>
          )}
        </Container>
        <ScrapButton
          top={23}
          scraped={scraped}
          poi={this.props.poi}
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
    return { state: !!initialState || !!currentState, count: initialCount }
  }

  return {
    state: currentState,
    count:
      initialState === currentState
        ? initialCount
        : initialCount + (currentState ? 1 : -1),
  }
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
        <SquareImage
          src={(image && image.sizes.large.url) || POI_IMAGE_PLACEHOLDER}
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
            poi={poi}
            onScrapedChange={onScrapedChange}
          />
        )}
      </Carousel.Item>
    )
  }
}

const CompactScrapButton = styled.div`
  position: absolute;
  top: ${({ top }) => (top === 0 ? 0 : top || 0)}px;
  right: ${({ right }) => (right === 0 ? 0 : right || 0)}px;
  width: 34px;
  height: 34px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-list-on@2x.png' : 'btn-content-scrap-list-off@2x.png')});
  background-size: 34px 34px;
`

const RegularScrapButton = styled.div`
  position: absolute;
  top: ${({ top }) => (top === 0 ? 0 : top || 3)}px;
  right: ${({ right }) => (right === 0 ? 0 : right || 3)}px;
  width: 36px;
  height: 36px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-overlay-on@2x.png' : 'btn-content-scrap-overlay-off@2x.png')});
  background-size: 36px 36px;
`

function ScrapButton({ compact, poi, scraped, onScrapedChange, ...props }) {
  const ButtonElement = compact ? CompactScrapButton : RegularScrapButton
  const handleClick =
    onScrapedChange &&
    ((e) => {
      e.stopPropagation()
      onScrapedChange(e, { ...poi, scraped: !scraped })
    })

  return <ButtonElement pressed={scraped} onClick={handleClick} {...props} />
}
