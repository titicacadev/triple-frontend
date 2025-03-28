import { measureDistance } from '@titicaca/view-utilities'
import { authGuardedFetchers, NEED_LOGIN_IDENTIFIER } from '@titicaca/fetcher'

import { NearByPoiType, ListingPoi } from './types'

export async function fetchPois({
  type,
  excludedIds = [],
  regionId = null,
  lat,
  lon,
  distance = 1000,
  from = 0,
  size = 3,
}: {
  type: NearByPoiType
  excludedIds?: string[]
  regionId?: string | null
  lat: number
  lon: number
  distance?: number | string
  from?: number
  size?: number
}): Promise<ListingPoi[]> {
  const response = await authGuardedFetchers.post<ListingPoi[]>(
    '/api/content/pois',
    {
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: {
        types: [type],
        lat,
        lon,
        distance,
        from,
        size,
        excludedIds,
        regionId,
      },
    },
  )
  if (response === NEED_LOGIN_IDENTIFIER || !response.ok) {
    throw new Error(`Failed to fetch nearby POIs: ${type}`)
  }
  const { parsedBody: pois } = response
  return pois.map((poi) => ({
    ...poi,
    distance: measureDistance(poi.source.pointGeolocation, {
      type: 'Point',
      coordinates: [lon, lat],
    }),
  }))
}
