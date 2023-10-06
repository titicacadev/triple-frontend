import { ReactNode, MouseEventHandler } from 'react'
import {
  ImageMeta,
  PointGeoJson,
  TranslatedProperty,
} from '@titicaca/type-definitions'

export type ActionButtonElement = ReactNode

export interface PoiListElementBaseProps<T extends PoiListElementType> {
  poi: T
  onClick?: MouseEventHandler<HTMLLIElement>
}

type PoiType = 'attraction' | 'restaurant' | 'hotel'

export interface PoiListElementType {
  id: string
  type: PoiType
  categories?: { id: string; name: string }[]
  nameOverride?: string
  reviewed?: boolean
  scraped?: boolean
  distance?: number
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  region?: {
    source: {
      names: TranslatedProperty
    }
  }
  source: {
    areas?: { name: string }[]
    categories?: { id: string; filter?: boolean; name: string }[]
    comment?: string
    scrapsCount?: number
    reviewsCount?: number
    reviewsRating?: number
    grade?: number
    id?: string
    geolocation?: PointGeoJson
    pointGeolocation?: PointGeoJson
    regionId?: string
    image?: ImageMeta
    names: TranslatedProperty
    starRating?: number
    vicinity?: string
    type?: PoiType
  }
}
