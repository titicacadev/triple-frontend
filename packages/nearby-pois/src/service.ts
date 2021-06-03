import fetch from 'isomorphic-fetch'
import { measureDistance } from '@titicaca/view-utilities'
import { PointGeoJSON } from '@titicaca/type-definitions'

import { NearByPoisType } from './types'

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
  type: NearByPoisType['type']
  excludedIds?: string[]
  regionId?: string | null
  lat: number
  lon: number
  distance?: number | string
  from?: number
  size?: number
}): Promise<NearByPoisType[]> {
  const response = await fetch('/api/content/pois', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      types: [type],
      lat,
      lon,
      distance,
      from,
      size,
      excludedIds,
      regionId,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch nearby POIs: ${type}`)
  }

  const pois = await response.json()

  return pois.map((poi: NearByPoisType) => ({
    ...poi,
    distance: measureDistance(poi.source.pointGeolocation as PointGeoJSON, {
      type: 'Point',
      coordinates: [lon, lat],
    }),
  }))
}
