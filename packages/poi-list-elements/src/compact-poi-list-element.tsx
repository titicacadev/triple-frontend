import React, { useState, useRef, useEffect } from 'react'
import {
  Text,
  SquareImage,
  ResourceListItem,
  Container,
} from '@titicaca/core-elements'
import { ListingPOI } from '@titicaca/type-definitions'
import { CompactScrapButton } from '@titicaca/scrap-button'

import { POIListElementBaseProps, ActionButtonElement } from './types'
import { TYPE_NAMES } from './constants'

interface CompactPoiListElementBaseProps<T extends ListingPOI>
  extends POIListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
}

export type CompactPoiListElementProps<
  T extends ListingPOI
> = CompactPoiListElementBaseProps<T> &
  Partial<Pick<Parameters<typeof ResourceListItem>['0'], 'as'>>

const POI_IMAGE_PLACEHOLDERS_SMALL: { [key in ListingPOI['type']]: string } = {
  attraction: 'https://assets.triple.guide/images/ico-blank-see-small@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat-small@2x.png',
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel-small@2x.png',
}

export function CompactPoiListElement<T extends ListingPOI>({
  actionButtonElement,
  poi,
  poi: {
    type,
    nameOverride,
    source: { names, image },
  },
  onClick,
}: CompactPoiListElementProps<T>) {
  const [actionButtonWidth, setActionButtonWidth] = useState(0)
  const actionButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (actionButtonRef && actionButtonRef.current) {
      setActionButtonWidth((actionButtonRef?.current as any)?.width)
    }
  }, [actionButtonRef])

  const name = nameOverride || names.ko || names.en || names.local

  return (
    <ResourceListItem onClick={onClick}>
      <SquareImage
        floated="left"
        size="small"
        src={image ? image.sizes.large.url : POI_IMAGE_PLACEHOLDERS_SMALL[type]}
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
        <div ref={actionButtonRef}>{actionButtonElement}</div>
      ) : (
        <Container position="absolute" positioning={{ top: 0, right: 0 }}>
          <CompactScrapButton resource={poi} />
        </Container>
      )}
    </ResourceListItem>
  )
}
