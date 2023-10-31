import { PoiListElementType } from './types'

export const POI_IMAGE_PLACEHOLDERS: {
  [key in PoiListElementType['type']]: string
} = {
  attraction:
    'https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-flag-line-24.svg',
  restaurant:
    'https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-food-line-24.svg',
  hotel: 'https://assets.triple.guide/images/ico_blank_hotel@2x.png',
}
