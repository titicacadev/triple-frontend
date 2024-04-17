import { useCallback, MouseEvent } from 'react'
import { Container } from '@titicaca/kint5-core-elements'
import {
  MapView,
  AttractionCircleMarker,
  RestaurantCircleMarker,
  DotPolyline,
  FestaCircleMarker,
} from '@titicaca/kint5-map'
import { useEnv } from '@titicaca/react-contexts'
import {
  Itinerary,
  ItineraryItemType,
  PoiType,
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
    <Container
      className="chromatic-ignore"
      css={{
        width: '100%',
        height: 180,
      }}
    >
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

function ItineraryTypeCircleMarker(type: PoiType | 'festa' | null) {
  switch (type) {
    case 'festa':
      return FestaCircleMarker
    case 'attraction':
      return AttractionCircleMarker
    case 'restaurant':
      return RestaurantCircleMarker
    default:
      return AttractionCircleMarker
  }
}
