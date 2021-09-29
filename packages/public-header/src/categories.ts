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
      return 'TRIPLE 항공 홈'
    case 'hotels':
      return 'TRIPLE 숙소 홈'
    case 'tna':
      return 'TRIPLE 투어 티켓 홈'
    default:
      return 'TRIPLE 홈'
  }
}

export function getCategoryImageProps(category?: Category) {
  switch (category) {
    case 'air':
      return {
        src: 'https://assets.triple.guide/images/img_intro_logo_air.svg',
      }
    case 'hotels':
      return {
        src: 'https://assets.triple.guide/images/img_intro_logo_hotels.svg',
      }
    case 'tna':
      return {
        src: 'https://assets.triple.guide/images/img_intro_logo_tna.svg',
      }
    default:
      return {}
  }
}
