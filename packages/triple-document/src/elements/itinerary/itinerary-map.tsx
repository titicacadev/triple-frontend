import { useCallback, MouseEvent } from 'react'
import { Container } from '@titicaca/core-elements'
import {
  MapView,
  HotelCircleMarker,
  AttractionCircleMarker,
  RestaurantCircleMarker,
  DotPolyline,
} from '@titicaca/map'
import { useEnv } from '@titicaca/react-contexts'
import {
  Itinerary,
  ItineraryItemType,
} from '@titicaca/content-type-definitions'

import useMapData from './use-computed-map'

interface Props {
  /** 몇번째 일정 */
  day: Itinerary['day']
  /** 추천 코스 POI 목록 */
  items: Itinerary['items']
  /** 지도상 마커 클릭 핸들러 */
  onClickMarker: (poi: ItineraryItemType['poi']) => void
}

export default function ItineraryMap({ onClickMarker, items }: Props) {
  const { googleMapsApiKey } = useEnv()
  const { totalPois, polyline, pois, coordinates } = useMapData(items)

  const generateClickMarkerHandler = useCallback(
    (poi: ItineraryItemType['poi']) => (e: MouseEvent) => {
      e.preventDefault()

      if (onClickMarker) {
        onClickMarker(poi)
      }
    },
    [onClickMarker],
  )

  return (
    <Container width="100%" height={180} className="chromatic-ignore">
      {googleMapsApiKey ? (
        <MapView
          coordinates={coordinates}
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
                onClick={generateClickMarkerHandler(poi)}
              >
                <strong>{i + 1}</strong>
              </CircleMarker>
            )
          })}
          <DotPolyline path={polyline} />
        </MapView>
      ) : null}
    </Container>
  )
}

/**
 * NOTE: poi.type 값을 기반으로 공통 CircleMarker 컴포넌트로 맵핑하는 WrapperComponent
 */
function ItineraryTypeCircleMarker(type: ItineraryItemType['poi']['type']) {
  switch (type) {
    case 'hotel':
      return HotelCircleMarker
    case 'attraction':
      return AttractionCircleMarker
    case 'restaurant':
      return RestaurantCircleMarker
  }

  throw new Error(`Unknown card type of itinerary "${type}"`)
}
