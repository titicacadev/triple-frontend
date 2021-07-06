import { TranslatedProperty } from './translated-property'
import { ImageMeta } from './image'
import { PointGeoJSON } from './geojson'

interface ListingPOISourceBase {
  id: string
  areas?: { name: string }[]
  categories?: { id: string; filter?: boolean; name: string }[]
  comment?: string
  grade: number
  hasTnaProducts?: boolean
  image?: ImageMeta
  names: TranslatedProperty
  pointGeolocation: PointGeoJSON
  reviewsRating?: number
  reviewsCount?: number
  scrapsCount?: number
  vicinity?: string
}

interface ListingPOIBase {
  id: string
  nameOverride?: string
  reviewed: boolean
  scraped: boolean
  distance?: number
  categories?: { id: string; name: string }[]
}

export interface ListingAttraction extends ListingPOIBase {
  type: 'attraction'
  source: ListingPOISourceBase & {
    type: 'attraction'
    regionId: string
  }
}

export interface ListingRestaurant extends ListingPOIBase {
  type: 'restaurant'
  source: ListingPOISourceBase & {
    type: 'restaurant'
    regionId: string
  }
}

export interface ListingHotel extends ListingPOIBase {
  type: 'hotel'
  source: ListingPOISourceBase & {
    type: 'hotel'
    regionId?: string
    starRating: number
    tags: { name: string }[]
  }
}

export type ListingPOI = ListingAttraction | ListingRestaurant | ListingHotel
