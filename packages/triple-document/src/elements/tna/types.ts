import { TagColors } from '@titicaca/core-elements'

type Price = string | number

interface DomesticArea {
  displayName: string
  id: string
  name: string
  representative: boolean
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
  domesticAreas: DomesticArea[]
}
