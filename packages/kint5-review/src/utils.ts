import qs from 'qs'

export function writeReview({
  appUrlScheme,
  resourceType,
  resourceId,
  regionId,
  rating = 0,
  photoFirst,
  lang,
}: {
  appUrlScheme: string
  resourceType: string
  resourceId: string
  regionId?: string
  rating?: number
  photoFirst?: boolean
  lang: string
}) {
  const params = qs.stringify({
    region_id: regionId,
    resource_type: resourceType,
    resource_id: resourceId,
    rating,
    lang,
    ...(photoFirst && { photo_first: 'true' }),
  })
  window.location.href = `${appUrlScheme}:///reviews/new?${params}`
}
