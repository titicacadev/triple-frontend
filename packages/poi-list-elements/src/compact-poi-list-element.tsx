import React, { useState, useRef, useEffect } from 'react'
import {
  Text,
  SquareImage,
  ResourceListItem,
  Container,
} from '@titicaca/core-elements'
import { PoiResponse } from '@titicaca/type-definitions'
import { OutlineScrapButton } from '@titicaca/scrap-button'

import { POIListElementBaseProps, ActionButtonElement } from './types'
import { TYPE_NAMES } from './constants'

interface CompactPoiListElementBaseProps<T extends PoiResponse>
  extends POIListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
}

export type CompactPoiListElementProps<
  T extends PoiResponse
> = CompactPoiListElementBaseProps<T> &
  Partial<Pick<Parameters<typeof ResourceListItem>['0'], 'as'>>

const POI_IMAGE_PLACEHOLDERS_SMALL: { [key in PoiResponse['type']]: string } = {
  attraction: 'https://assets.triple.guide/images/ico-blank-see-small@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat-small@2x.png',
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel-small@2x.png',
}

export function CompactPoiListElement<T extends PoiResponse>({
  actionButtonElement,
  poi,
  poi: {
    type,
    nameOverride,
    region,
    source: { names, image, areas, vicinity },
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

  const { names: regionNames } = region?.source || {}

  const name = nameOverride || names.ko || names.en || names.local
  const regionName = regionNames?.ko || regionNames?.en || regionNames?.local

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
        {[
          TYPE_NAMES[type],
          regionName
            ? areas?.[0]?.name
              ? `${regionName}(${areas?.[0]?.name})`
              : regionName
            : vicinity,
        ]
          .filter(Boolean)
          .join(' · ')}
      </Text>

      {actionButtonElement ? (
        <div ref={actionButtonRef}>{actionButtonElement}</div>
      ) : (
        <Container position="absolute" positioning={{ top: 0, right: 0 }}>
          <OutlineScrapButton resource={poi} size={34} />
        </Container>
      )}
    </ResourceListItem>
  )
}
