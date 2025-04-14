import { authGuardedFetchers } from '@titicaca/fetcher'

import type { Target } from './types'

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

export function fetchScrape({ id, type }: Target) {
  return authGuardedFetchers.post<ScrapSuccessResponse, ScrapFailResponse>(
    `/api/scraps/${mapTypes(type)}/${id}`,
  )
}

export function fetchUnscrape({ id, type }: Target) {
  return authGuardedFetchers.del<unknown, ScrapFailResponse>(
    `/api/scraps/${mapTypes(type)}/${id}`,
  )
}
