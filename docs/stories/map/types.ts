import type {
  TranslatedProperty,
  PointGeoJSON,
  ImageMeta,
} from '@titicaca/type-definitions'

type BaseResourceType = {
  id: string
  name: string
}

type Price = {
  promoText: string // "최대 8%",
  nightlyPrice: number // 79228,
  clubPromotionTarget: boolean // true,
  nightlyPriceHotelPromotionApplied: number // 79228,
  clubPromotionRate: number // 0,
  clubMemberOnly: boolean // false,
  nightlyBasePrice: number // 79228,
  clubPromotionType: 'STATIC'
}

export type HotelResourceType = {
  id: string
  source: {
    id: string
    regionId: string
    names: TranslatedProperty
    comment: string
    pointGeolocation: PointGeoJSON
    grade: number
    areas: BaseResourceType[]
    image: ImageMeta
    tags: BaseResourceType[]
    starRating: number // 3
    reviewsCount: number // 1
    scrapsCount: number // '5'
    reviewsRating: number // 5
  }
  scraped: boolean
}

export type RecommendationHotelResourceType = {
  id: string
  hotel: HotelResourceType
  price: Price
  reasons: string[]
}
