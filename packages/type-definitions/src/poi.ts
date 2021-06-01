import { PoiSource, Recommendation } from '@titicaca/pois-utilities'

import { TranslatedProperty } from './translated-property'
import { ImageMeta } from './image'
import { PointGeoJSON } from './geojson'

type PoiType = 'attraction' | 'restaurant' | 'hotel'

export interface PoiResponse {
  id: string
  type: PoiType
  nameOverride?: string
  scraped: boolean
  reviewed: boolean
  distance?: number
  source: {
    addresses: TranslatedProperty
    areas?: { name: string }[]
    categories?: { name: string }[]
    comment?: string
    grade: number
    id: string
    hasTnaProducts: boolean
    image: ImageMeta
    images: ImageMeta[]
    geolocation?: PointGeoJSON
    names: TranslatedProperty
    permanentlyClosed: boolean
    permanentlyClosedAt?: string
    pointGeolocation: PointGeoJSON
    pricing?: {
      nightlyPrice?: number | null
    } | null
    regionId: string
    scrapsCount: number
    reviewsCount: number
    reviewsRating: number
    starRating: number
    type: PoiType
    geotags?:
      | {
          id: string
          type: string
          osmLevel: number
        }[]
      | null
    vicinity?: string
    tags: { name: string }[]
    relationshipCounts: { [key: string]: number }
    deletedAt?: string
    foreignEntities?: Array<{
      service: string
      identifier: string
    }>
    recommendations?: Recommendation[]
  } & Omit<PoiSource, 'recommendations'>
  region?: {
    id: string
    timeZone: string
    names: TranslatedProperty
    source: any
  }
}
