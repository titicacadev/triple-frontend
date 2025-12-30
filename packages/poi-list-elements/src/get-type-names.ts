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

const FALLBACK_TYPE_NAMES: {
  [key in PoiListElementType['type']]: string
} = {
  attraction: '관광명소',
  restaurant: '음식점',
  hotel: '호텔',
}

export function getTypeNames(type: PoiListElementType['type']) {
  try {
    const t = getTranslation('common-web')
    return t(TYPE_NAMES[type])
  } catch (error) {
    // i18n이 초기화되지 않은 경우 (예: Storybook) 기본값 반환
    return FALLBACK_TYPE_NAMES[type]
  }
}
