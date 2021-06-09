import { TagColors } from '@titicaca/core-elements'

type Price = string | number

export interface TNAProductData {
  id: number | string
  heroImage?: string
  title?: string
  tags?: { text: string; type: TagColors; style: React.CSSProperties }[]
  salePrice?: Price
  basePrice?: Price
  reviewRating: number
  reviewsCount: number
}
