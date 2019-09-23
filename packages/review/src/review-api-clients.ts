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
  resourceId,
  resourceType,
  order = '',
  from = 0,
  size = 30,
}: FetchReviewsInterface) {
  const url = `/api/reviews/v2${
    order ? '/' + order : ''
  }?resource_id=${resourceId}&resource_type=${resourceType}&from=${from}&size=${size}`
  return fetch(url, { credentials: 'same-origin' })
}

export function fetchMyReviews({ resourceType, resourceId }) {
  return fetch(
    `/api/reviews/v2/me?resourceType=${resourceType}&resourceId=${resourceId}`,
    { credentials: 'same-origin' },
  )
}

export function deleteReview({ id }: { id: string }) {
  return fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}

export interface FetchReviewsInterface {
  resourceId: string
  resourceType: string
  order: string
  from: number
  size: number
}
