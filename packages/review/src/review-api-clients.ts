import fetch from 'isomorphic-fetch'
import humps from 'humps'

export function writeReview({
  appUrlScheme,
  resourceType,
  resourceId,
  regionId,
  rating = 0,
}: {
  appUrlScheme: string
  resourceType: string
  resourceId: string
  regionId: string
  rating: number
}) {
  window.location.href = `${appUrlScheme}:///reviews/new?region_id=${regionId}&resource_type=${resourceType}&resource_id=${resourceId}&rating=${rating}`
}

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

export async function fetchReviews({
  resourceId,
  resourceType,
  order = '',
  from = 0,
  size = 30,
}: FetchReviewsInterface) {
  const url = `/api/reviews/v2${
    order ? '/' + order : ''
  }?resource_id=${resourceId}&resource_type=${resourceType}&from=${from}&size=${size}`

  const response = await fetch(url, { credentials: 'same-origin' })

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.status} ${url}`)
  }

  const { reviews } = humps.camelizeKeys(await response.json())

  return reviews
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
  order?: string
  from?: number
  size?: number
}
