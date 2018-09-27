import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Container from '../elements/container'
import Text from '../elements/text'
import Rating from '../elements/rating'
import Image from '../elements/image'
import List from '../elements/list'
import {
  SquareImage,
  CarouselElementContainer,
  ResourceListItem,
} from '../elements/content-elements'

const TYPE_NAMES = {
  attraction: '관광명소',
  restaurant: '음식점',
  hotel: '호텔',
}

const POI_IMAGE_PLACEHOLDER =
  'https://assets.triple.guide/images/ico-blank-see@2x.png'

class CompactPoiListElement extends PureComponent {
  state = { actionButtonWidth: 0 }

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
        poi: {
          type,
          nameOverride,
          source: { names, image },
        },
        onClick,
        actionButtonElement,
      },
      state: { actionButtonWidth },
    } = this

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
        <Text size="tiny" margin={{ top: 4, left: 50 }}>
          {TYPE_NAMES[type]}
        </Text>
        {actionButtonElement && (
          <div ref={this.setActionButtonRef}>{actionButtonElement}</div>
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
          type,
          nameOverride,
          scraped,
          source: {
            names,
            image,
            areas: [area],
            categories: [category],
            comment,
            reviewsCount,
            scrapsCount,
            reviewsRating,
          },
          distance,
        },
        onClick,
      },
    } = this

    return (
      <ExtendedPoiListItem onClick={onClick}>
        <Image
          floated="right"
          size="small"
          width={100}
          src={(image && image.sizes.large.url) || POI_IMAGE_PLACEHOLDER}
          margin={{ left: 20 }}
        />
        <Text bold ellipsis alpha={1} size="large">
          {nameOverride || names.ko || names.en || names.local}
        </Text>
        <Text alpha={0.7} size="small" margin={{ top: 5 }}>
          {comment}
        </Text>
        <Container margin={{ top: 5 }}>
          {reviewsCount && (
            <>
              <Rating size="small" score={reviewsRating} />
              <Text inline size="small" alpha={0.4}>
                {` (${reviewsCount})`}
              </Text>
            </>
          )}
          {reviewsCount &&
            scrapsCount && (
              <Text inline size="small" alpha={0.4}>
                {' · '}
              </Text>
            )}
          {scrapsCount && (
            <Text inline size="small" alpha={0.4}>{`저장${scrapsCount}`}</Text>
          )}
        </Container>
        <Container margin={{ top: 3 }}>
          {distance && (
            <Text inline color="blue" size="small">
              {distance}m
            </Text>
          )}
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
      </ExtendedPoiListItem>
    )
  }
}

export function PoiListElement({ compact, ...props }) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}

export function PoiCarouselElement({ poi, onClick, actionButtonElement }) {
  if (poi) {
    const {
      type,
      nameOverride,
      source: { image, names },
    } = poi

    return (
      <CarouselElementContainer size="small" onClick={onClick}>
        <SquareImage
          src={(image && image.sizes.large.url) || POI_IMAGE_PLACEHOLDER}
        />
        <Text bold ellipsis alpha={1} margin={{ top: 8 }}>
          {nameOverride || names.ko || names.en || names.local}
        </Text>
        <Text size="tiny" margin={{ top: 2 }}>
          {TYPE_NAMES[type]}
        </Text>
        {actionButtonElement}
      </CarouselElementContainer>
    )
  }
}
