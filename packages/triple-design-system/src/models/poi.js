import React, { PureComponent } from 'react'
import Text from '../elements/text'
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

export class PoiListElement extends PureComponent {
  constructor() {
    super()

    this.state = { actionButtonWidth: 0 }
  }

  setActionButtonRef(ref) {
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
          src={image && image.sizes.large.url}
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
          <div ref={(ref) => this.setActionButtonRef(ref)}>
            {actionButtonElement}
          </div>
        )}
      </ResourceListItem>
    )
  }
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
        <SquareImage src={image && image.sizes.large.url} />
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
