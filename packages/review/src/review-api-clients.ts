import fetch from 'isomorphic-fetch'
import humps from 'humps'

import { ResourceType, ReviewData } from './types'

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

export async function fetchReviewRateDescription({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType
  resourceId: string
}): Promise<string[]> {
  const response = await fetch(
    `/api/reviews/v2/specification?resource_id=${resourceId}&resource_type=${resourceType}`,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to get rate description for ${resourceType} : ${response.status}`,
    )
  }

  const {
    specification: {
      rating: { description },
    },
  } = await response.json()

  return description
}

export async function fetchMyReview({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType
  resourceId: string
}): Promise<ReviewData | null> {
  const response = await fetch(
    `/api/reviews/v2/me?resource_type=${resourceType}&resource_id=${resourceId}`,
    { credentials: 'same-origin' },
  )

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch my reviews: ${response.status}`)
  }

  const { review } = await response.json()

  return humps.camelizeKeys(review as object) as ReviewData
}

export function deleteReview({ id }: { id: string }) {
  return fetch(`/api/reviews/v2/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
}

export interface FetchReviewsInterface {
  resourceId: string
  resourceType: ResourceType
  order?: string
  from?: number
  size?: number
}

export async function fetchReviewsCount({
  resourceId,
  resourceType,
}: {
  resourceId: string
  resourceType: ResourceType
}): Promise<number> {
  const response = await fetch(
    `/api/reviews/v2/count?resource_id=${resourceId}&resource_type=${resourceType}`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews count: ${response.status}`)
  }

  const { reviewCount } = await response.json()

  return reviewCount
}
