import { useMemo } from 'react'
import { getGeometry } from '@titicaca/map'
import type { LatLngLiteral } from '@titicaca/type-definitions'
import type { ItineraryItemType } from '@titicaca/content-utilities'

type Poi = {
  poi: ItineraryItemType['poi']
  position: LatLngLiteral
}

type ItineraryMapData = {
  totalPois: number
  pois: Poi[]
  polyline: LatLngLiteral[]
  mapOptions: { center: LatLngLiteral; zoom?: number }
  bounds?: google.maps.LatLngBoundsLiteral
}
/**
 * TODO: move to use-safety-poi
 */
function getLatLng({ source }: ItineraryItemType['poi']): LatLngLiteral {
  const [lng, lat] =
    source?.geolocation?.coordinates || source?.pointGeolocation?.coordinates
  return { lat, lng }
}

/**
 * FIXME: getGeometry 함수가 LatLngLiteral 타입 기반으로 동작하도록 개선하면
 * 유일한 타입으로 이 함수는 없어도 됩니다.
 * [number, number][] -> { lat, lng } 으로 개선이 필요
 */
function extractPoiCoordinate(items: ItineraryItemType[]) {
  return items.map(
    (item) =>
      item.poi.source?.geolocation?.coordinates ||
      item.poi.source?.pointGeolocation?.coordinates,
  )
}

function extracPathMap(items: ItineraryItemType[]): LatLngLiteral[] {
  return items.map(({ poi }) => getLatLng(poi))
}

/**
 * TripleDocument 추천코스 목록 데이터에서 MapView 표시해야 할 정보들을 추출하는 로직들을 담습니다.
 * @param param0 TripleDoucment Itinerary Day Items
 */
export default function useMapData(
  items: ItineraryItemType[],
): ItineraryMapData {
  return useMemo(() => {
    const coordinates = extractPoiCoordinate(items)
    const polyline = extracPathMap(items)
    const totalPois = items.length

    const { center, bounds, zoom } = getGeometry(coordinates)

    const pois = items.map(({ poi }) => ({
      poi,
      position: getLatLng(poi),
    }))

    return {
      totalPois,
      pois,
      polyline,
      mapOptions: { center, zoom },
      bounds,
    }
  }, [items])
}
