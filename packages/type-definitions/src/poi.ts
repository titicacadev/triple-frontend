import { TranslatedProperty } from './translated-property'
import { ImageMeta } from './image'
import { PointGeoJSON } from './geo-json'

interface POISourceBase {
  id: string
  areas?: { name: string }[]
  categories?: { name: string }[]
  comment?: string
  grade: number
  hasTnaProducts?: boolean
  image: ImageMeta
  location: number[] // [number, number]
  names: TranslatedProperty
  pointGeolocation: PointGeoJSON
  reviewsRating?: number
  reviewsCount?: number
  scrapsCount?: number
}

interface POIBase {
  id: string
  nameOverride?: string
  reviewed: boolean
  scraped: boolean
  distance?: number
}

export interface Attraction extends POIBase {
  type: 'attraction'
  source: POISourceBase & {
    type: 'attraction'
    regionId: string
  }
}

export interface Restaurant extends POIBase {
  type: 'restaurant'
  source: POISourceBase & {
    type: 'restaurant'
    regionId: string
  }
}

export interface Hotel extends POIBase {
  type: 'hotel'
  source: POISourceBase & {
    type: 'hotel'
    regionId?: string
    starRating: number
    tags: { name: string }[]
    pricing: {
      promoText: string
      nightlyPrice: number
      clubPromotionTarget: boolean
      nightlyPriceHotelPromotionApplied: number
      clubPromotionRate: number
      clubMemberOnly: boolean
      nightlyBasePrice: number
      clubPromotionType: 'STATIC'
    }
  }
  prices?: {
    nightlyBasePrice?: number
    nightlyPrice?: number
    promoText: string
    nightlyPriceHotelPromotionApplied: number
    clubPromotionRate: number
    clubPromotionType: 'STATIC'
    clubMemberOnly: boolean
    clubPromotionTarget: boolean
  }
  priceInfo: {
    nightlyBasePrice?: number
    nightlyPrice?: number
  }
}

export type POI = Attraction | Restaurant | Hotel
