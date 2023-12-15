import { post, del } from '@titicaca/fetcher'

import { Target } from './types'

function mapTypes(type: unknown) {
  switch (type) {
    case 'magazine':
    case 'guide':
    case 'article':
      return 'articles'
    case 'tna':
      return 'tna'
    case 'festa':
      return 'festa'
    default:
      return 'pois'
  }
}

export function scrape({ id, type, lang = 'ko' }: Target) {
  return post(`/api/scraps/${mapTypes(type)}/${id}`, {
    headers: { 'X-Service-Origin': 'global', 'X-Triple-User-Lang': lang },
  })
}

export function unscrape({ id, type, lang = 'ko' }: Target) {
  return del(`/api/scraps/${mapTypes(type)}/${id}`, {
    headers: { 'X-Service-Origin': 'global', 'X-Triple-User-Lang': lang },
  })
}
