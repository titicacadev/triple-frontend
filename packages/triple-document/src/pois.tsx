import React from 'react'
import styled from 'styled-components'
import {
  PoiListElement,
  PoiCarouselElement,
  PoiListElementProps,
} from '@titicaca/poi-list-elements'
import { Text } from '@titicaca/core-elements'
import { ListingPOI } from '@titicaca/type-definitions'

import ResourceList from './resource-list'
import DocumentCarousel from './document-carousel'

const PoiPrice = styled.div`
  position: absolute;
  top: 3px;
  right: 0;
  width: 80px;
  padding-top: 8px;
  padding-bottom: 7px;
  text-align: center;
  border-radius: 17px;
  background-color: #fafafa;
`

type ExtendedPOIListElementData = ListingPOI & {
  source: ListingPOI['source'] & {
    pricing?: {
      nightlyPrice?: number | null
    } | null
  }
}

type PoisDisplay = 'list' | string

export default function Pois<T extends ExtendedPOIListElementData>({
  value: { display, pois },
  actionButtonElement,
  onResourceClick,
}: {
  value: {
    display: PoisDisplay
    pois: T[]
  }
  actionButtonElement: JSX.Element | null
  onResourceClick?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    poi: T,
  ) => void
}) {
  const Container = display === 'list' ? ResourceList : DocumentCarousel
  const margin =
    display === 'list' ? { top: 20, left: 30, right: 30 } : { top: 20 }
  const Element =
    display === 'list'
      ? function WrappedPoiListElment(
          props: Omit<PoiListElementProps<T>, 'compact'>,
        ) {
          return <PoiListElement compact {...props} />
        }
      : PoiCarouselElement

  return (
    <Container margin={margin}>
      {pois.map((poi) => (
        <Element
          key={poi.id}
          poi={poi}
          onClick={
            onResourceClick
              ? (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                  onResourceClick(e, poi)
                }
              : undefined
          }
          actionButtonElement={renderPoiListActionButton({
            actionButtonElement,
            display,
            poi,
          })}
        />
      ))}
    </Container>
  )
}

function renderPoiListActionButton({
  actionButtonElement,
  display,
  poi,
}: {
  actionButtonElement: JSX.Element | null
  display: PoisDisplay
  poi: ExtendedPOIListElementData
}) {
  if (actionButtonElement === null) {
    return <span />
  } else if (actionButtonElement) {
    return actionButtonElement
  }

  const {
    source: { pricing },
  } = poi

  if (display === 'list' && pricing) {
    const { nightlyPrice } = pricing

    return (
      <PoiPrice>
        <Text bold size="mini">
          {nightlyPrice ? `₩${nightlyPrice.toLocaleString()}` : '보기'}
        </Text>
      </PoiPrice>
    )
  }

  return null
}
