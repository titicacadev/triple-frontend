import { TranslatedProperty } from './translated-property'
import { ImageMeta } from './image'
import { PointGeoJson } from './geojson'

interface ListingPoiSourceBase {
  id: string
  areas?: { name: string }[]
  categories?: { id: string; filter?: boolean; name: string }[]
  comment?: string
  grade: number
  hasTnaProducts?: boolean
  image?: ImageMeta
  names: TranslatedProperty
  pointGeolocation: PointGeoJson
  reviewsRating?: number
  reviewsCount?: number
  scrapsCount?: number
  vicinity?: string
}

interface ListingPoiBase {
  id: string
  nameOverride?: string
  reviewed: boolean
  scraped: boolean
  distance?: number
  categories?: { id: string; name: string }[]
}

export interface ListingAttraction extends ListingPoiBase {
  type: 'attraction'
  source: ListingPoiSourceBase & {
    type: 'attraction'
    regionId: string
  }
}

export interface ListingRestaurant extends ListingPoiBase {
  type: 'restaurant'
  source: ListingPoiSourceBase & {
    type: 'restaurant'
    regionId: string
  }
}

export interface ListingHotel extends ListingPoiBase {
  type: 'hotel'
  source: ListingPoiSourceBase & {
    type: 'hotel'
    regionId?: string
    starRating: number
    tags: { name: string }[]
  }
}

export type ListingPoi = ListingAttraction | ListingRestaurant | ListingHotel
