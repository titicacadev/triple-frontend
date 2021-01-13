import React, { useCallback } from 'react'
import { Container } from '@titicaca/core-elements'
import { PoiType } from '@titicaca/type-definitions'
import MapView, {
  HotelCircleMarker,
  AttractionCirlceMarker,
  RestaurantCirlceMarker,
  DotPolyline,
} from '@titicaca/map'
import styled from 'styled-components'

import useMapData from './use-computed-map'
import { ItineraryPoi, Itinerary } from './types'

type Props = {
  /** google maps api key */
  googleMapsApiKey: string
  /** 몇번째 일정 */
  day: Itinerary['day']
  /** 추천 코스 POI 목록 */
  items: Itinerary['items']
  /** 지도상 마커 클릭 핸들러 */
  onClickMarker: (poi: ItineraryPoi) => void
}

const Label = styled.span`
  font-weight: bold;
`

/**
 * NOTE: poi.type 값을 기반으로 공통 CircleMarker 컴포넌트로 맵핑하는 WrapperComponent
 */
function ItineraryTypeCircleMarker(type: PoiType) {
  switch (type) {
    case 'hotel':
      return HotelCircleMarker
    case 'attraction':
      return AttractionCirlceMarker
    case 'restaurant':
      return RestaurantCirlceMarker
  }

  throw new Error(`Unknown card type of itinerary "${type}"`)
}

export default function Map({ googleMapsApiKey, onClickMarker, items }: Props) {
  const { totalPois, polyline, pois, mapOptions, bounds } = useMapData(items)

  const generateClickMarkerHandle = useCallback(
    (poi: ItineraryPoi) => (e: MouseEvent) => {
      e.preventDefault()

      if (onClickMarker) {
        onClickMarker(poi)
      }
    },
    [onClickMarker],
  )

  return (
    <Container width="100%" height={180}>
      <MapView
        options={mapOptions}
        bounds={bounds}
        googleMapLoadOptions={{
          googleMapsApiKey,
        }}
      >
        {pois.map(({ position, poi: { type }, poi }, i) => {
          const CircleMarker = ItineraryTypeCircleMarker(type)

          return (
            <CircleMarker
              key={i}
              zIndex={totalPois - i}
              width={22}
              height={22}
              position={position}
              onClick={generateClickMarkerHandle(poi)}
            >
              <Label style={{ fontWeight: 'bold' }}>{i + 1}</Label>
            </CircleMarker>
          )
        })}
        <DotPolyline path={polyline}></DotPolyline>
      </MapView>
    </Container>
  )
}
