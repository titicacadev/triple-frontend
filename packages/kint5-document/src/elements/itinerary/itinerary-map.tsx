import { useCallback, MouseEvent, Fragment } from 'react'
import { Container } from '@titicaca/kint5-core-elements'
import {
  MapView,
  AttractionCircleMarker,
  RestaurantCircleMarker,
  PolylineBase,
  FestaCircleMarker,
} from '@titicaca/kint5-map'
import { useEnv } from '@titicaca/react-contexts'
import {
  Itinerary,
  ItineraryItemType,
  PoiType,
} from '@titicaca/content-type-definitions'

import useMapData from './use-computed-map'
import { COLOR_PER_TYPE } from './constants'

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
              <Fragment key={i}>
                <CircleMarker
                  zIndex={totalPois - i}
                  width={22}
                  height={22}
                  position={position}
                  onClick={generateClickMarkerHandler(poi)}
                >
                  <strong>{i + 1}</strong>
                </CircleMarker>
                <PolylineBase
                  path={polyline.slice(i, i + 2)}
                  strokeColor={COLOR_PER_TYPE[type ?? 'attraction']}
                  strokeWeight={2}
                  strokeOpacity={1}
                />
              </Fragment>
            )
          })}
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
