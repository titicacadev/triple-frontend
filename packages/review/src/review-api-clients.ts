import humps from 'humps'
import qs from 'qs'
import { get, post, del } from '@titicaca/fetcher'

import { ResourceType, ReviewData } from './types'

export function writeReview({
  appUrlScheme,
  resourceType,
  resourceId,
  regionId,
  rating = 0,
  photoFirst,
}: {
  appUrlScheme: string
  resourceType: ResourceType
  resourceId: string
  regionId?: string
  rating?: number
  photoFirst?: boolean
}) {
  const params = qs.stringify({
    region_id: regionId,
    resource_type: resourceType,
    resource_id: resourceId,
    rating,
    ...(photoFirst && { photo_first: 'true' }),
  })

  window.location.href = `${appUrlScheme}:///reviews/new?${params}`
}

export function likeReview({ id }: { id: string }) {
  return post(`/api/reviews/v2/${id}/like`, {
    credentials: 'same-origin',
  })
}

export function unlikeReview({ id }: { id: string }) {
  return del(`/api/reviews/v2/${id}/like`, {
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
  const response = await get<{
    specification: {
      rating: { description: string[] }
    }
  }>(
    `/api/reviews/v2/specification?resource_id=${resourceId}&resource_type=${resourceType}`,
    {
      credentials: 'same-origin',
    },
  )

  if (response.ok === true) {
    const {
      parsedBody: {
        specification: {
          rating: { description },
        },
      },
    } = response

    return description
  } else {
    throw new Error(
      `Failed to get rate description for ${resourceType} : ${response.status}`,
    )
  }
}

export async function fetchMyReview({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType
  resourceId: string
}): Promise<ReviewData | null> {
  const response = await get(
    `/api/reviews/v2/me?resource_type=${resourceType}&resource_id=${resourceId}`,
    { credentials: 'same-origin' },
  )

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch my reviews: ${response.status}`)
  }

  const { parsedBody: review } = response

  return humps.camelizeKeys(review as object) as ReviewData
}

export function deleteReview({ id }: { id: string }) {
  return del(`/api/reviews/v2/${id}`, {
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
  const response = await get<number>(
    `/api/reviews/v2/count?resource_id=${resourceId}&resource_type=${resourceType}`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews count: ${response.status}`)
  }

  const { parsedBody: reviewCount } = response

  return reviewCount
}
