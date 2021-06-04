import { PoiListElementType } from './types'

export const POI_IMAGE_PLACEHOLDERS: {
  [key in PoiListElementType['type']]: string
} = {
  attraction: 'https://assets.triple.guide/images/ico-blank-see@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat@2x.png',
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel@2x.png',
}

export const TYPE_NAMES: { [key in PoiListElementType['type']]: string } = {
  attraction: '관광명소',
  restaurant: '음식점',
  hotel: '호텔',
}
