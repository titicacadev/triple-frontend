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
      return 'Triple 항공 홈'
    case 'hotels':
      return 'Triple 숙소 홈'
    case 'tna':
      return 'Triple 투어 티켓 홈'
    default:
      return 'Triple 홈'
  }
}

export function getCategoryImageProps(category?: Category) {
  switch (category) {
    case 'air':
      return {
        alt: '항공',
        src: 'https://assets.triple.guide/images/img_intro_logo_air.svg',
      }
    case 'hotels':
      return {
        alt: '숙소',
        src: 'https://assets.triple.guide/images/img_intro_logo_hotels.svg',
      }
    case 'tna':
      return {
        alt: '투어 티켓',
        src: 'https://assets.triple.guide/images/img_intro_logo_tna.svg',
      }
    default:
      return {}
  }
}
