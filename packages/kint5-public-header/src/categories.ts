import { getTranslation } from '@titicaca/next-i18next'

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
  const t = getTranslation('common-web')

  switch (category) {
    case 'air':
      return t(['triple-hanggong-hom', 'Triple 항공 홈'])
    case 'hotels':
      return t(['triple-sugso-hom', 'Triple 숙소 홈'])
    case 'tna':
      return t(['triple-tueo-tikes-hom', 'Triple 투어 티켓 홈'])
    default:
      return t(['triple-hom', 'Triple 홈'])
  }
}

export function getCategoryImageProps(category?: Category) {
  const t = getTranslation('common-web')

  switch (category) {
    case 'air':
      return {
        alt: t(['hanggong', '항공']),
        src: 'https://assets.triple.guide/images/img_intro_logo_air.svg',
      }
    case 'hotels':
      return {
        alt: t(['sugso', '숙소']),
        src: 'https://assets.triple.guide/images/img_intro_logo_hotels.svg',
      }
    case 'tna':
      return {
        alt: t(['tueo-tikes', '투어 티켓']),
        src: 'https://assets.triple.guide/images/img_intro_logo_tna.svg',
      }
    default:
      return {}
  }
}
