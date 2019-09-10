import fetch from 'isomorphic-fetch'

export function likeReview({ id }: { id: string }) {
  return fetch(`/api/reviews/v2/${id}/like`, {
    method: 'POST',
    credentials: 'same-origin',
  })
}

export function unlikeReview({ id }: { id: string }) {
  return fetch(`/api/reviews/v2/${id}/like`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}

export function fetchReviews({
  id,
  resourceType,
  order = '',
  from = 0,
  size = 30,
}: {
  id: string
  resourceType: string
  order: string
  from: number
  size: number
}) {
  const url = `/api/reviews/v2?resource_id=${id}&resource_type=${resourceType}&from=${from}&size=${size}&order=${order}`
  return fetch(url, { credentials: 'same-origin' })
}

export function fetchMyReviews() {
  return fetch(`/api/reviews/v2/me`, { credentials: 'same-origin' })
}

export function deleteReview({ id }: { id: string }) {
  return fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}
