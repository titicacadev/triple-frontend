import { get, post } from '@titicaca/fetcher'

import { Banner } from './typing'

export type ContentType =
  | 'article'
  | 'attraction'
  | 'hotel'
  | 'restaurant'
  | 'air'

export enum BannerTypes {
  ListTopBanner = 'menu_top_banner_ad_v0',
  ContentDetailsBanner = 'content_details_ad_v0',
}

interface UserLocation {
  latitude?: number | null
  longitude?: number | null
}

interface AdBannersFetchingParams {
  contentType: ContentType
  regionId: string
  contentId?: string
  contentRegionId?: string
  userLocation: UserLocation
  bannerType: BannerTypes
}

/**
 * 트리플 광고 시스템에 등록된 광고 목록을 요청합니다.
 *
 * @param contentType
 * @param regionId
 * @param contentId
 * @param userLocation
 * @param bannerType
 */

export async function getAdBanners({
  contentType,
  regionId,
  contentId,
  userLocation,
  bannerType,
}: AdBannersFetchingParams) {
  const search = getSearchQuery(bannerType, {
    contentType,
    regionId,
    contentId,
    userLocation,
  })

  const response = await get<{ items: Banner[] }>(
    `/api/inventories/${bannerType}/items?${search}`,
    {
      credentials: 'same-origin',
    },
  )
  if (response.ok === true) {
    const {
      parsedBody: { items },
    } = response
    return items
  } else {
    return []
  }
}

/**
 * 광고 노출, 광고 클릭 이벤트를 기록합니다.
 *
 * @param itemId 광고 ID
 * @param eventType
 * @param regionId
 * @param bannerType
 * @param userLocation
 * @param contentId
 * @param contentType
 */
export async function postAdBannerEvent({
  itemId,
  eventType,
  regionId,
  bannerType,
  userLocation,
  contentId,
  contentType,
}: {
  itemId: string
  eventType: string
  bannerType: BannerTypes
  userLocation?: UserLocation
  regionId: string
  contentId?: string
  contentType?: ContentType
}) {
  const body = getRequestBody(bannerType, {
    eventType,
    regionId,
    contentId,
    contentType,
    userLocation,
  })

  return post(`/api/inventories/${bannerType}/items/${itemId}/events`, {
    body,
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  })
}

function getSearchQuery(
  bannerType: BannerTypes,
  options: {
    contentType: string
    regionId: string
    contentId?: string
    userLocation?: UserLocation
  },
) {
  const { contentId, regionId, contentType, userLocation } = options

  switch (bannerType) {
    case BannerTypes.ContentDetailsBanner:
      return {
        content_id: contentId,
        content_region_id: regionId,
        content_type: contentType,
        user_location:
          userLocation && userLocation.longitude && userLocation.latitude
            ? `${userLocation.longitude},${userLocation.latitude}`
            : undefined,
      }
    case BannerTypes.ListTopBanner:
      return {
        content_type: contentType,
        region_id: regionId,
      }
  }
}

function getRequestBody(
  bannerType: BannerTypes,
  options: {
    eventType: string
    contentId?: string
    regionId: string
    contentType?: string
    userLocation?: UserLocation
  },
) {
  const { eventType, contentId, regionId, contentType, userLocation } = options

  switch (bannerType) {
    case BannerTypes.ContentDetailsBanner:
      return {
        content: {
          id: contentId,
          regionId,
          type: contentType,
        },
        eventType,
        userLocation:
          userLocation && userLocation.longitude && userLocation.latitude
            ? [userLocation.longitude, userLocation.latitude]
            : undefined,
      }
    case BannerTypes.ListTopBanner:
      return {
        eventType,
        regionId,
      }
  }
}
