import { useMemo } from 'react'
import type { LatLngLiteral } from '@titicaca/type-definitions'
import type { ItineraryItemType } from '@titicaca/content-type-definitions'

interface MapItem {
  item: ItineraryItemType
  position: LatLngLiteral
}

interface ItineraryMapData {
  mapItems: MapItem[]
  polyline: LatLngLiteral[]
  coordinates: [number, number][]
}

function getItemLatLng(item: ItineraryItemType): LatLngLiteral {
  const coordinates = item.poi
    ? item.poi.source?.geolocation?.coordinates
    : item.festa.geolocation?.coordinates

  const [lng, lat] = coordinates || [0, 0]
  return { lat, lng }
}

/**
 * FIXME: getGeometry 함수가 LatLngLiteral 타입 기반으로 동작하도록 개선하면
 * 유일한 타입으로 이 함수는 없어도 됩니다.
 * [number, number][] -> { lat, lng } 으로 개선이 필요
 */
function extractItemCoordinates(items: ItineraryItemType[]) {
  return items.map(({ poi, festa }) =>
    poi ? poi.source?.geolocation?.coordinates : festa.geolocation?.coordinates,
  )
}

/**
 * TripleDocument 추천코스 목록 데이터에서 MapView 표시해야 할 정보들을 추출하는 로직들을 담습니다.
 * @param param0 TripleDoucment Itinerary Day Items
 */
export default function useMapData(
  items: ItineraryItemType[],
): ItineraryMapData {
  return useMemo(() => {
    const coordinates = extractItemCoordinates(items).filter(
      (coordinate): coordinate is [number, number] => !!coordinate,
    )

    const polyline = items.map((item) => getItemLatLng(item))

    const mapItems = items.map((item) => ({
      item,
      position: getItemLatLng(item),
    }))

    return {
      coordinates,
      mapItems,
      polyline,
    }
  }, [items])
}
