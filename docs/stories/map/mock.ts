import { getGeometry } from '@titicaca/map'

import HOTELS from '../__mocks__/map/hotel-recommandations.json'

import { RecommendationHotelResourceType } from './types'

export const coordinates: [
  number,
  number,
][] = ((HOTELS as unknown) as RecommendationHotelResourceType[])
  .map(({ hotel }) => hotel)
  .map(
    ({
      source: {
        pointGeolocation: { coordinates },
      },
    }) => coordinates as [number, number],
  )

export const mapOptions = getGeometry(coordinates)
export const polylinePaths = [
  { lat: 16.0563348, lng: 108.2025533 },
  { lat: 16.0131183, lng: 108.2637083 },
  { lat: 16.0349407, lng: 108.2294803 },
  { lat: 16.0347492, lng: 108.2291364 },
  { lat: 16.0616944, lng: 108.2469346 },
  { lat: 16.0691917, lng: 108.2429779 },
  { lat: 16.0694295, lng: 108.2422102 },
  { lat: 16.0131183, lng: 108.2637083 },
]

export const polylineGeometry = getGeometry(
  polylinePaths.map((path) => [path.lng, path.lat]),
)
