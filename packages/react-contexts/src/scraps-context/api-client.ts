import { post, del } from '@titicaca/fetcher'

import { Target } from './types'

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

interface ScrapSuccessResponse {
  id: string
}

interface ScrapFailResponse {
  message: string
}

export function scrape({ id, type }: Target) {
  return post<ScrapSuccessResponse, ScrapFailResponse>(
    `/api/scraps/${mapTypes(type)}/${id}`,
  )
}

export function unscrape({ id, type }: Target) {
  return del<unknown, ScrapFailResponse>(`/api/scraps/${mapTypes(type)}/${id}`)
}
