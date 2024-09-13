import { PoiListElementType } from './types'

export function getTypeNames(type: PoiListElementType['type']) {
  switch (type) {
    case 'attraction': {
      return '관광명소'
    }
    case 'hotel': {
      return '호텔'
    }
    case 'restaurant': {
      return '음식점'
    }
  }
}
