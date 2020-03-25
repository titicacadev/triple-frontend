import fetch from 'isomorphic-fetch'
import haversine from 'haversine'
import { POI } from '@titicaca/poi-list-elements'

import { PoiType, PointGeoJSON } from './types'

export async function fetchPois({
  type,
  excludedIds = [],
  regionId,
  lat,
  lon,
  distance = 1000,
  from = 0,
  size = 3,
}: {
  type: PoiType
  excludedIds?: string[]
  regionId: string
  lat: number
  lon: number
  distance?: number | string
  from?: number
  size?: number
}) {
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

  return pois.map((poi: POI) => ({
    ...poi,
    distance: measureDistance(poi.source.pointGeolocation, {
      type: 'Point',
      coordinates: [lon, lat],
    }),
  }))
}

function measureDistance(
  { coordinates: [fromLon, fromLat] }: PointGeoJSON,
  { coordinates: [toLon, toLat] }: PointGeoJSON,
) {
  return Math.round(
    haversine(
      { latitude: fromLat, longitude: fromLon },
      { latitude: toLat, longitude: toLon },
      { unit: 'meter' },
    ),
  )
}
