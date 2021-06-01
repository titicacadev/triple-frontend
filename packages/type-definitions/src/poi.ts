import { PoiSource, PoiType, Recommendation } from '@titicaca/pois-utilities'

import { ImageMeta, PointGeoJSON, TranslatedProperty } from './index'

export interface PoiResponse {
  id: string
  nameOverride?: string
  distance?: number
  type: PoiType | string
  source: {
    id: string
    areas?: { name: string }[]
    categories?: { name: string }[]
    comment?: string
    grade: number
    pricing?: {
      nightlyPrice?: number | null
    } | null
    image: ImageMeta
    images: ImageMeta[]
    scrapsCount: number
    reviewsCount: number
    reviewsRating: number
    type: PoiType | string
    regionId: string
    pointGeolocation: PointGeoJSON
    geolocation: PointGeoJSON
    names: TranslatedProperty
    addresses: TranslatedProperty
    geotags:
      | {
          id: string
          type: string
          osmLevel: number
        }[]
      | null
    hasTnaProducts: boolean
    permanentlyClosed: boolean
    permanentlyClosedAt?: string
    vicinity?: string
    relationshipCounts: { [key: string]: number }
    deletedAt?: string
    foreignEntities?: Array<{
      service: string
      identifier: string
    }>
    recommendations?: Recommendation[]
    starRating: number
    tags: { name: string }[]
  } & Omit<PoiSource, 'recommendations'>
  reviewed: boolean
  scraped: boolean
  region?: {
    id: string
    timeZone: string
    names: TranslatedProperty
    source: any
  }
}
