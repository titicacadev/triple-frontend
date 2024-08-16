import { useTranslation } from 'react-i18next'

import type { Category } from './types'

export function getCategoryHref(category?: Category) {
  switch (category) {
    case 'air':
      return '/air'
    case 'hotels':
      return '/hotels'
    case 'tna':
      return '/tna'
    default:
      return '/'
  }
}

export function useCategoryTitle(category?: Category) {
  const { t } = useTranslation('triple-frontend')
  switch (category) {
    case 'air':
      return t('Triple 항공 홈')
    case 'hotels':
      return t('Triple 숙소 홈')
    case 'tna':
      return t('Triple 투어 티켓 홈')
    default:
      return t('Triple 홈')
  }
}

export function useCategoryImageProps(category?: Category) {
  const { t } = useTranslation('triple-frontend')

  switch (category) {
    case 'air':
      return {
        alt: t('항공'),
        src: 'https://assets.triple.guide/images/img_intro_logo_air.svg',
      }
    case 'hotels':
      return {
        alt: t('숙소'),
        src: 'https://assets.triple.guide/images/img_intro_logo_hotels.svg',
      }
    case 'tna':
      return {
        alt: t('투어 티켓'),
        src: 'https://assets.triple.guide/images/img_intro_logo_tna.svg',
      }
    default:
      return {}
  }
}
