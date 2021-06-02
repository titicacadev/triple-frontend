import { PointGeoJSON } from '@titicaca/type-definitions'
import { PoiListElementType } from '@titicaca/poi-list-elements'

type PoiType = 'attraction' | 'restaurant'

export type NearByPoisType = {
  id: string
  type: PoiType
  source: {
    type: PoiType
    regionId: string
    pointGeolocation: PointGeoJSON
  }
} & PoiListElementType
