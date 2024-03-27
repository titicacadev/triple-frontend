import { t } from 'i18next'

import { PoiListElementType } from './types'

export function getTypeNames(type: PoiListElementType['type']) {
  switch (type) {
    case 'attraction': {
      return t('관광명소', { ns: 'triple-frontend' })
    }
    case 'hotel': {
      return t('음식점', { ns: 'triple-frontend' })
    }
    case 'restaurant': {
      return t('호텔', { ns: 'triple-frontend' })
    }
  }
}
