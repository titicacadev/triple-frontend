import fetch from 'isomorphic-fetch'

export function fetchMyReview({ id, type }) {
  return fetch(`/api/${type}s/${id}/review/me`, {
    credentials: 'same-origin',
  })
}

export function fetchImages({ id, type }, { from, size }) {
  return fetch(`/api/content/${type}s/${id}/images?from=${from}&size=${size}`, {
    credentials: 'same-origin',
  })
}

export function likeReview({ id }) {
  return fetch(`/api/reviews/${id}/like`, {
    method: 'POST',
    credentials: 'same-origin',
  })
}

export function unlikeReview({ id }) {
  return fetch(`/api/reviews/${id}/like`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}

export function scrape({ id, type }) {
  return fetch(`/api/${type}s/${id}/scrap`, {
    method: 'POST',
    credentials: 'same-origin',
  })
}

export function unscrape({ id, type }) {
  return fetch(`/api/${type}s/${id}/scrap`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}
