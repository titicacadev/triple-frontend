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
