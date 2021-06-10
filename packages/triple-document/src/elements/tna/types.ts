import { TagColors } from '@titicaca/core-elements'

type Price = string | number

interface DomesticArea {
  displayName: string
  id: string
  name: string
  representative: boolean
}

interface TnaCoupon {
  amountAfterUsingCoupon: number
  amountBeforeUsingCoupon: number
  description: string
  discountAmount: number
  discountPolicy: {
    maxDiscountAmount: number
    type: 'RATE' | 'AMOUNT'
    value: number
  }
  downloaded: boolean
  id: string
  name: string
}

export interface TNAProductData {
  id: number | string
  heroImage?: string
  title?: string
  tags?: { text: string; type: TagColors; style: React.CSSProperties }[]
  salePrice?: Price
  basePrice?: Price
  reviewRating: number
  reviewsCount: number
  domesticeAreas: DomesticArea[]
  applicableCoupon?: TnaCoupon
  expectedApplicableCoupon?: TnaCoupon
}
