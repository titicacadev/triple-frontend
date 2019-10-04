import fetch from 'isomorphic-fetch'

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

export async function fetchMyReviews({ resourceType, resourceId }) {
  const response = await fetch(
    `/api/reviews/v2/me?resourceType=${resourceType}&resourceId=${resourceId}`,
    { credentials: 'same-origin' },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch my reviews: ${response.status}`)
  }

  const { data: reviews } = await response.json()

  return reviews
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
