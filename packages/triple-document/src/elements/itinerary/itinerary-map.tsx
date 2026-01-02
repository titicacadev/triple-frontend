import { useCallback, MouseEvent } from 'react'
import { Container } from '@titicaca/core-elements'
import {
  MapView,
  HotelCircleMarker,
  AttractionCircleMarker,
  RestaurantCircleMarker,
  DotPolyline,
  FestaCircleMarker,
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
  onClickMarker: (poi: ItineraryItemType) => void
}

export default function ItineraryMap({ onClickMarker, items }: Props) {
  const { googleMapsApiKey } = useEnv()
  const { polyline, mapItems, coordinates } = useMapData(items)

  const totalMapItemCount = mapItems.length

  const generateClickMarkerHandler = useCallback(
    (item: ItineraryItemType) => (e: MouseEvent) => {
      e.preventDefault()

      if (onClickMarker) {
        onClickMarker(item)
      }
    },
    [onClickMarker],
  )

  return (
    <Container
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
          {mapItems.map(({ position, item }, i) => {
            const CircleMarker = ItineraryTypeCircleMarker(item)

            return (
              <CircleMarker
                key={i}
                zIndex={totalMapItemCount - i}
                width={22}
                height={22}
                position={position}
                onClick={generateClickMarkerHandler(item)}
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

function ItineraryTypeCircleMarker(item: ItineraryItemType) {
  const type = item.poi ? item.poi.type : 'festa'

  switch (type) {
    case 'hotel':
      return HotelCircleMarker
    case 'attraction':
      return AttractionCircleMarker
    case 'restaurant':
      return RestaurantCircleMarker
    case 'festa':
      return FestaCircleMarker
  }

  throw new Error(`Unknown card type of itinerary "${type}"`)
}
