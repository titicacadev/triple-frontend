import {
  ImageMeta,
  PointGeoJSON,
  TranslatedProperty,
} from '@titicaca/type-definitions'

export type ActionButtonElement = React.ReactNode

export interface POIListElementBaseProps<T extends PoiListElementType> {
  poi: T
  onClick?: React.MouseEventHandler<HTMLLIElement>
}

type PoiType = 'attraction' | 'restaurant' | 'hotel'

export interface PoiListElementType {
  id: string
  type: PoiType
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
    categories?: { name: string }[]
    comment?: string
    scrapsCount?: number
    reviewsCount?: number
    reviewsRating?: number
    grade?: number
    id?: string
    geolocation?: PointGeoJSON
    pointGeolocation?: PointGeoJSON
    regionId?: string
    image?: ImageMeta
    names: TranslatedProperty
    starRating?: number
    vicinity?: string
    type?: PoiType
  }
}
