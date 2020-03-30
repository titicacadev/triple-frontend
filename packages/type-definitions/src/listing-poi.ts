import { TranslatedProperty } from './translated-property'
import { ImageMeta } from './image'
import { PointGeoJSON } from './geojson'

interface ListingPOISourceBase {
  id: string
  areas?: { name: string }[]
  categories?: { name: string }[]
  comment?: string
  grade: number
  hasTnaProducts?: boolean
  image: ImageMeta
  names: TranslatedProperty
  pointGeolocation: PointGeoJSON
  reviewsRating?: number
  reviewsCount?: number
  scrapsCount?: number
}

interface ListingPOIBase {
  id: string
  nameOverride?: string
  reviewed: boolean
  scraped: boolean
  distance?: number
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

export type ListingPOI = ListingAttraction | ListingRestaurant | ListingHotel
