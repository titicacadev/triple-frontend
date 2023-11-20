import { I18nKeys } from '@titicaca/i18n'
import { t } from 'i18next'

import { PoiListElementType } from './types'

const TYPE_NAMES: {
  [key in PoiListElementType['type']]: keyof I18nKeys
} = {
  attraction: '관광명소',
  restaurant: '음식점',
  hotel: '호텔',
}

export function getTypeNames(type: PoiListElementType['type']) {
  return t(TYPE_NAMES[type], { ns: 'triple-frontend' })
}
