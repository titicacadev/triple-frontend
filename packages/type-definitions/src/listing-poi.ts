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
  image?: ImageMeta
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
  }

  /** @deprecated priceInfos를 사용해주세요 */
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

  /** @deprecated priceInfos를 사용해주세요 */
  priceInfo?: {
    nightlyBasePrice: number
    nightlyPrice: number
    price: number
    discountRate: number
    badge: string
    excludedVat: number
    originalPrice: number
  }

  priceInfos?: {
    badge: string
    nightlyPrice: number
    originalPrice?: number
    promotionText?: string
    issuableCouponAppliedNightlyPrice?: number
    site: string
    siteImageId: string
    supplier?: string
  }[]
}

export type ListingPOI = ListingAttraction | ListingRestaurant | ListingHotel
