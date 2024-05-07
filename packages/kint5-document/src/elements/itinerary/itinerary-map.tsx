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
} from '@titicaca/content-type-definitions'

import { GOOGLE_MAP_STYLES } from './google-map-style'
import useMapData from './use-computed-map'
import { COLOR_PER_TYPE } from './constants'

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
          options={{
            styles: GOOGLE_MAP_STYLES,
          }}
        >
          {mapItems.map(({ position, item }, i) => {
            const CircleMarker = ItineraryTypeCircleMarker(item)

            return (
              <Fragment key={i}>
                <CircleMarker
                  zIndex={totalMapItemCount - i}
                  width={22}
                  height={22}
                  position={position}
                  onClick={generateClickMarkerHandler(item)}
                >
                  <strong>{i + 1}</strong>
                </CircleMarker>
                <PolylineBase
                  path={polyline.slice(i, i + 2)}
                  strokeColor={
                    COLOR_PER_TYPE[
                      item.poi ? item.poi.type ?? 'attraction' : 'festa'
                    ]
                  }
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

function ItineraryTypeCircleMarker(item: ItineraryItemType) {
  const type = item.poi ? item.poi.type : 'festa'

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
