import { getTranslation } from '@titicaca/next-i18next'
import { I18nCommonWebKeys } from '@titicaca/i18n'

import { PoiListElementType } from './types'

const TYPE_NAMES: {
  [key in PoiListElementType['type']]: (keyof I18nCommonWebKeys)[]
} = {
  attraction: ['gwangwangmyeongso', '관광명소'],
  restaurant: ['eumsigjeom', '음식점'],
  hotel: ['hotel', '호텔'],
}

export function getTypeNames(type: PoiListElementType['type']) {
  const t = getTranslation('common-web')

  return t(TYPE_NAMES[type])
}
