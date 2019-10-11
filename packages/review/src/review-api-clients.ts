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

export async function fetchMyReview({ resourceType, resourceId }) {
  const response = await fetch(
    `/api/reviews/v2/me?resource_type=${resourceType}&resource_id=${resourceId}`,
    { credentials: 'same-origin' },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch my reviews: ${response.status}`)
  }

  const { review } = await response.json()

  if (review) {
    const user = await (await fetch('/api/users/me')).json()

    return {
      ...review,
      user,
    }
  }

  return null
}

export function deleteReview({ id }: { id: string }) {
  return fetch(`/api/reviews/v2/${id}`, {
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
