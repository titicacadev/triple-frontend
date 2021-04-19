import { SyntheticEvent } from 'react'
import { TranslatedProperty, ImageMeta } from '@titicaca/type-definitions'

export interface RegionData {
  nameOverride: string | null
  source: {
    id: string
    names: TranslatedProperty
    style?: {
      backgroundImageUrl: string
    }
  }
}

export interface TripleElementData<T = string, Value = unknown> {
  type: T
  value: Value
}

export type ImageEventHandler = (e: SyntheticEvent, image: ImageMeta) => void

export type Link = {
  href?: string
  label?: string
  level?: string
}

export type LinkEventHandler = (e: React.SyntheticEvent, link: Link) => void

export interface ElementSet {
  [type: string]: React.ComponentType<any>
}

export interface CouponData {
  id: string
  name: string
  description: string
  publicationPeriod?: {
    startAt: string
    endAt: string
  }
  validityPeriod?: {
    startAt: string
    endAt: string
  }
  status?: string
  expired?: true
  maxDiscountAmount: number
  discountPolicy: {
    type: string
    value: number
  }
  useConditions: [
    {
      type: string
      value: string
    },
  ]
  downloaded?: true
}
