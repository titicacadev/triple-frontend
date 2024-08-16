import { useTranslation } from 'react-i18next'

import { PoiListElementType } from './types'

export function useTypeName(type: PoiListElementType['type']) {
  const { t } = useTranslation('triple-frontend')

  switch (type) {
    case 'attraction': {
      return t('관광명소')
    }
    case 'hotel': {
      return t('호텔')
    }
    case 'restaurant': {
      return t('음식점')
    }
  }
}
