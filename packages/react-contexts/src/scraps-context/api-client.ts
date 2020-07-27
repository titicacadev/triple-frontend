import fetch from 'isomorphic-fetch'

import { Target } from './types'

export function scrape({ id, type }: Target) {
  return fetch(`/api/${type === 'article' ? 'articles' : 'pois'}/${id}/scrap`, {
    method: 'POST',
    credentials: 'same-origin',
  })
}

export function unscrape({ id, type }: Target) {
  return fetch(`/api/${type === 'article' ? 'articles' : 'pois'}/${id}/scrap`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}
