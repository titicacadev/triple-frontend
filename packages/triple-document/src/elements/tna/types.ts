import { TagColors } from '@titicaca/core-elements'

type Price = string | number

export type TNAProductsFetcher = (slotId: number) => Promise<Response>

export type TNAProductClickHandler = (
  e: React.SyntheticEvent,
  product: unknown,
  slotId?: number,
  index?: number,
) => void

export interface TNAProductsResponse {
  products: TNAProductData[]
  title: string
  description?: string
}

export interface DomesticArea {
  displayName: string
  id: string
  name: string
  representative: boolean
}

export interface DiscountPolicy {
  maxDiscountAmount: number
  type: 'RATE' | 'AMOUNT'
  value: number
}

export interface TnaCoupon {
  amountAfterUsingCoupon: number
  amountBeforeUsingCoupon: number
  description: string
  discountAmount: number
  discountPolicy: DiscountPolicy
  downloaded: boolean
  id: string
  name: string
}

export interface TNAProductData {
  id: string
  heroImage: string
  title: string
  tags: { text: string; type: TagColors; style: React.CSSProperties }[]
  salePrice: Price
  basePrice: Price
  reviewRating: number
  reviewsCount: number
  domesticAreas?: DomesticArea[]
  applicableCoupon?: TnaCoupon
  expectedApplicableCoupon?: TnaCoupon
  description?: string
  productId: string
  orderPrice: number
  supplierType: string
  eventTags?: string[]
  userId?: number
  scraped?: boolean
}
