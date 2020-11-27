import qs from 'querystring'

import fetch from 'isomorphic-fetch'

export type ContentType =
  | 'article'
  | 'attraction'
  | 'hotel'
  | 'restaurant'
  | 'air'

type UserLocation = {
  latitude?: number | null
  longitude?: number | null
}

interface AdBannersFetchingParams {
  contentType: ContentType
  contentId?: string
  contentRegionId?: string
  regionId: string
  userLocation: UserLocation
}

/**
 * 트리플 광고 시스템에 등록된 광고 목록을 요청합니다.
 *
 * @param contentType
 * @param contentId
 * @param contentRegionId
 * @param regionId
 * @param userLocation
 */
export async function getAdBanners({
  contentType,
  contentId,
  contentRegionId,
  regionId,
  userLocation: { latitude, longitude },
}: AdBannersFetchingParams) {
  const search = qs.stringify({
    content_type: contentType,
    content_id: contentId,
    content_region_id: contentRegionId,
    region_id: regionId,
    ...(longitude && latitude
      ? { user_location: `${longitude},${latitude}` }
      : {}),
  })

  const response = await fetch(
    `/api/inventories/menu_top_banner_ad_v0/items?${search}`,
    {
      credentials: 'same-origin',
    },
  )

  if (response.ok) {
    const { items } = await response.json()
    return items
  }

  return []
}

/**
 * 광고 노출, 광고 클릭 이벤트를 기록합니다.
 *
 * @param itemId 광고 ID
 * @param eventType
 * @param regionId
 */
export async function postAdBannerEvent({
  itemId,
  eventType,
  regionId,
}: {
  itemId: string
  eventType: string
  regionId?: string
}) {
  return fetch(
    `/api/inventories/menu_top_banner_ad_v0/items/${itemId}/events`,
    {
      body: JSON.stringify({ eventType, regionId }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    },
  )
}
