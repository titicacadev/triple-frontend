import type {
  TranslatedProperty,
  PointGeoJson,
  ImageMeta,
} from '@titicaca/type-definitions'

interface BaseResourceType {
  id: string
  name: string
}

enum PoiType {
  Attraction = 'attraction',
  Restaurant = 'restaurant',
  Article = 'article',
  Hotel = 'hotel',
  Tna = 'tna',
  Air = 'air',
}

interface Price {
  promoText: string // "최대 8%",
  nightlyPrice: number // 79228,
  clubPromotionTarget: boolean // true,
  nightlyPriceHotelPromotionApplied: number // 79228,
  clubPromotionRate: number // 0,
  clubMemberOnly: boolean // false,
  nightlyBasePrice: number // 79228,
  clubPromotionType: 'STATIC'
}

export interface HotelResourceType {
  id: string
  source: {
    id: string
    regionId: string
    names: TranslatedProperty
    comment: string
    pointGeolocation: PointGeoJson
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

export interface RecommendationHotelResourceType {
  id: string
  hotel: HotelResourceType
  price: Price
  reasons: string[]
}

export interface RecommendationItineraryCardResourceType {
  cardType: string
  content: {
    pois?: RecommendationItineraryPoiCard[]
    poi?: RecommendationItineraryPoiCard
    flight?: unknown
  }
  options: {
    isRecommended: boolean
    isHidden?: boolean // 일정추천뷰에서는 보이지 않고, 일정 import 에서는 보여야 하는 카드
    needFlight?: boolean
  }
  memo: string
}

export interface RecommendationItineraryResourceType {
  day: number
  date: string
  cards: RecommendationItineraryCardResourceType[]
}

export interface RecommendationItineraryPoiCard {
  id?: string
  source: {
    type: PoiType
    id?: string
    regionId: string
    names: TranslatedProperty
    addresses: TranslatedProperty
    location: number[]
    comment: string
    pointGeolocation: PointGeoJson
    grade: number
    areas: BaseResourceType[]
    categories?: BaseResourceType[] // type: [attraction, restaurant]
    image: ImageMeta
    hasTnaProducts: false
    scrapsCount: number // '0'
    starRating?: number // type: [hotel]
  }
  customPoiId?: number
  planId?: number // 나만의장소로 등록한 숙소의 경우, 상세랜딩시 필요
}
