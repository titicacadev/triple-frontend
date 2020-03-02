import qs from 'querystring'

import fetch from 'isomorphic-fetch'

export type ContentType = 'article' | 'attraction' | 'hotel' | 'restaurant'

type UserLocation = {
  latitude?: number | null
  longitude?: number | null
}

interface AdBannersFetchingParams {
  contentType: ContentType
  contentId: string
  regionId?: string
  userLocation?: UserLocation
}

interface AdBannerEventPostingParams {
  contentType: ContentType
  contentId: string
  itemId: string
  eventType: 'click' | 'impression'
  regionId?: string
  userLocation?: UserLocation
}

/**
 * 트리플 광고 시스템에 등록된 광고 목록을 요청합니다.
 *
 * @param contentType
 * @param contentId
 * @param regionId
 * @param userLocation
 */
export async function getAdBanners({
  contentType,
  contentId,
  regionId,
  userLocation: { latitude, longitude } = {},
}: AdBannersFetchingParams) {
  /* eslint-disable @typescript-eslint/camelcase */
  const search = qs.stringify({
    content_type: contentType,
    content_id: contentId,
    ...(regionId ? { content_region_id: regionId } : {}),
    ...(latitude && longitude
      ? { user_location: `${longitude},${latitude}` }
      : {}),
  })
  /* eslint-enable @typescript-eslint/camelcase */

  const response = await fetch(
    `/api/inventories/content_details_ad_v0/items?${search}`,
    {
      credentials: 'same-origin',
    },
  )

  if (response.ok) {
    const { items } = await response.json()
    return items
  }
}

/**
 * 광고 노출, 광고 클릭 이벤트를 기록합니다.
 *
 * @param contentType
 * @param contentId
 * @param itemId 광고 ID
 * @param eventType
 * @param regionId
 * @param userLocation
 */
export async function postAdBannerEvent({
  contentType,
  contentId,
  itemId,
  eventType,
  regionId,
  userLocation: { latitude, longitude } = {},
}: AdBannerEventPostingParams) {
  const payload = {
    content: {
      id: contentId,
      type: contentType,
      regionId,
    },
    eventType,
    userLocation: latitude && longitude ? [longitude, latitude] : undefined,
  }

  await fetch(`/api/inventories/content_details_ad_v0/items/${itemId}/events`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
