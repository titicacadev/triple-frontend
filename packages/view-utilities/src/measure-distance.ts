import haversine from 'haversine'
import { PointGeoJson } from '@titicaca/type-definitions'

/**
 * 맵상에서의 직선거리를 구하는 함수
 *
 * @param param0 기준점 (e.g.) { coordinates: [125.12345, 59.12345] }
 * @param param1 도착점 { coordinates: [125.12345, 59.12345] }
 *
 * - https://en.wikipedia.org/wiki/Haversine_formula
 */
export function measureDistance(
  { coordinates: [fromLon, fromLat] }: PointGeoJson,
  { coordinates: [toLon, toLat] }: PointGeoJson,
) {
  return Math.round(
    haversine(
      { latitude: fromLat, longitude: fromLon },
      { latitude: toLat, longitude: toLon },
      { unit: 'meter' },
    ),
  )
}
