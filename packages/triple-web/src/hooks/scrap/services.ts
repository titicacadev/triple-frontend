import { post, del } from '@titicaca/fetcher'

import { Target } from './use-scrap'

function mapTypes(type: unknown) {
  switch (type) {
    case 'article':
      return 'articles'
    case 'tna':
      return 'tna'
    default:
      return 'pois'
  }
}

export function fetchScrape({ id, type }: Target) {
  return post(`/api/scraps/${mapTypes(type)}/${id}`)
}

export function fetchUnscrape({ id, type }: Target) {
  return del(`/api/scraps/${mapTypes(type)}/${id}`)
}
