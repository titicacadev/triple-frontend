import fetch from 'isomorphic-fetch'

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

export function scrape({ id, type }: Target) {
  return fetch(`/api/${mapTypes(type)}/${id}/scrap`, {
    method: 'POST',
    credentials: 'same-origin',
  })
}

export function unscrape({ id, type }: Target) {
  return fetch(`/api/${mapTypes(type)}/${id}/scrap`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}
