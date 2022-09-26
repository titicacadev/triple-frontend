import { CSSProperties, SyntheticEvent } from 'react'
import { TagColors } from '@titicaca/core-elements'

type Price = string | number

export type TnaProductsFetcher = (slotId: number) => Promise<Response>

export type TnaProductsClickHandler = (
  e: SyntheticEvent,
  product: unknown,
  slotId?: number,
  index?: number,
) => void

export interface TnaProductsResponse {
  products: TnaProductData[]
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

export interface TnaProductData {
  id: string
  heroImage: string
  title: string
  tags: { text: string; type: TagColors; style: CSSProperties }[]
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
  bestSelfPackageDiscountSpec?: {
    tripId: number
    level: number
    schedule: {
      from: string
      to: string
    }
    destinations: {
      type: string
      id: string
    }[]
    discountPolicy: {
      discountRate: number
      maxDiscountAmount: number
    }
    token: string
  }
}
