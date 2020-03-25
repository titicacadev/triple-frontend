import fetch from 'isomorphic-fetch'

import { PoiType } from './types'

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
  lat: number | string
  lon: number | string
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

  return response.json()
}
