import qs from 'qs'

import { ResourceType } from '../../components/types'

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
