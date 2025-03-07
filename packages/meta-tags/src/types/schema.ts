import { SCHEMA_SCRIPT_TYPE_MAP } from '../utils'

export interface Author {
  type?: 'Person' | 'Organization'
  name: string
  url?: string
}

export interface ListItem {
  position: number
  name: string
  item?: string
}

export interface AddressSchema {
  streetAddress?: string
  addressLocality?: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
}

export interface GeoSchema {
  latitude: number
  longitude: number
}

export interface AggregateRatingSchema {
  ratingCount: number
  reviewCount?: number
  ratingValue: number
  bestRating?: number
  worstRating?: number
}

export interface AggregateOfferSchema {
  lowPrice: number
  priceCurrency: string
  highPrice?: number
  offerCount?: number
  availability?: ItemAvailability
}

export interface ReviewSchema {
  itemReviewed: {
    type: keyof typeof SCHEMA_SCRIPT_TYPE_MAP
    name: string // poi or product title
  }
  author: Author
  publisher?: Author
  description?: string
  datePublished?: string
  inLanguage?: string
  reviewRating: Pick<
    AggregateRatingSchema,
    'ratingValue' | 'bestRating' | 'worstRating'
  >
}

export enum ItemAvailability {
  BackOrder = 'BackOrder', // 이월 주문된 상품
  Discontinued = 'Discontinued', // 단종된 상품
  InStock = 'InStock', // 재고 있음
  InStoreOnly = 'InStoreOnly', // 매장에서만 구매 가능
  LimitedAvailability = 'LimitedAvailability', // 상품 재고가 한정적
  OnlineOnly = 'OnlineOnly', // 온라인에서만 구매 가능
  OutOfStock = 'OutOfStock', // 현재 재고가 없는 상품
  PreOrder = 'PreOrder', // 선주문할 수 있는 상품
  PreSale = 'PreSale', // 정식 버전 출시 전에 주문 및 배송 가능
  SoldOut = 'SoldOut', // 매진된 상품
}

export interface OpeningHoursSpecificationSchema {
  dayOfWeek: string
  opens: string
  closes: string
}

type Global = 'inherit' | 'initial' | 'revert' | 'unset'
type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export type ThemeColor = RGB | RGBA | HEX | Global

export type InteractionStatisticType = 'LikeAction' | 'CommentAction'

export interface InteractionStatistic {
  interactionType: {
    type: InteractionStatisticType
  }
  userInteractionCount: number
}

export interface CommentType {
  text: string
  author: Author
  datePublished: string
  interactionStatistic?: InteractionStatistic[]
  comment?: CommentType[]
}

export interface Answer {
  text: string
  upvoteCount: number
  url: string
  datePublished: string
  author: Author
  comment?: CommentType[]
}
