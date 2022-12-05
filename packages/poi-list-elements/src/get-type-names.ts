import { getTranslation, i18n } from '@titicaca/next-i18next'

import { PoiListElementType } from './types'
import { I18nKeys } from './i18n-types'

const TYPE_NAMES: { [key in PoiListElementType['type']]: keyof I18nKeys } = {
  attraction: 'gwangwangmyeongso',
  restaurant: 'eumsigjeom',
  hotel: 'hotel',
}

export function getTypeNames(type: PoiListElementType['type']) {
  if (!i18n) {
    return
  }
  const t = getTranslation('common-web')

  return t(TYPE_NAMES[type])
}
