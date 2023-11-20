import { t } from 'i18next'

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

export function getCategoryTitle(category?: Category) {
  switch (category) {
    case 'air':
      return t('Triple 항공 홈', { ns: 'triple-frontend' })
    case 'hotels':
      return t('Triple 숙소 홈', { ns: 'triple-frontend' })
    case 'tna':
      return t('Triple 투어 티켓 홈', { ns: 'triple-frontend' })
    default:
      return t('Triple 홈', { ns: 'triple-frontend' })
  }
}

export function getCategoryImageProps(category?: Category) {
  switch (category) {
    case 'air':
      return {
        alt: t('항공', { ns: 'triple-frontend' }),
        src: 'https://assets.triple.guide/images/img_intro_logo_air.svg',
      }
    case 'hotels':
      return {
        alt: t('숙소', { ns: 'triple-frontend' }),
        src: 'https://assets.triple.guide/images/img_intro_logo_hotels.svg',
      }
    case 'tna':
      return {
        alt: t('투어 티켓', { ns: 'triple-frontend' }),
        src: 'https://assets.triple.guide/images/img_intro_logo_tna.svg',
      }
    default:
      return {}
  }
}
