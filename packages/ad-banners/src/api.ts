import fetch from 'isomorphic-fetch'
import qs from 'querystring'

export type ContentType = 'article' | 'attraction' | 'hotel' | 'restaurant'

interface GetAdBannersParams {
  contentType: ContentType
  contentId: string
  regionId?: string
  userLocation?: {
    latitude?: number
    longitude?: number
  }
}

interface PostAdBannerEventParams {
  contentType: ContentType
  contentId: string
  itemId: string
  eventType: 'click' | 'impression'
  regionId?: string
  userLocation?: {
    latitude?: number
    longitude?: number
  }
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
}: GetAdBannersParams) {
  /* eslint-disable @typescript-eslint/camelcase */
  const search = qs.stringify({
    ...(regionId ? { region_id: regionId } : {}),
    ...(latitude && longitude
      ? { user_location: `${longitude},${latitude}` }
      : {}),
  })
  /* eslint-enable @typescript-eslint/camelcase */

  const response = await fetch(
    `/api/inventories/content_details_${contentType}_${contentId}/items${
      search ? `?${search}` : ''
    }`,
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
  userLocation: { latitude, longitude },
}: PostAdBannerEventParams) {
  const payload = {
    eventType,
    regionId,
    userLocation: latitude && longitude ? [longitude, latitude] : undefined,
  }

  await fetch(
    `/api/inventories/content_details_${contentType}_${contentId}/items/${itemId}/events`,
    {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )
}
