import { useCallback } from 'react'
import { useEventTrackingContext } from '@titicaca/react-contexts'

export interface EventLog {
  id: string
  title?: string
  itemId?: string
  product?: boolean
  regionId?: string
}

export enum EventTypeEnum {
  ARTICLE = 'article',
  HOTEL = 'hotel',
  AIR = 'air',
  TNA = 'tna',
}

function getCommonEventParams({
  type,
  id,
  title,
  itemId,
}: {
  type?: EventTypeEnum
  id: string
  title?: string
  itemId?: string
}) {
  switch (true) {
    case type === EventTypeEnum.ARTICLE:
      return {
        article_id: id,
        ...(itemId && { item_id: itemId }),
      }
    case type === EventTypeEnum.HOTEL:
      return {
        deal_id: id,
        deal_name: title,
        ...(itemId && { item_id: itemId }),
      }
    case type === EventTypeEnum.AIR:
      return {
        item_id: id,
        deal_name: title,
        ...(itemId && { article_item_id: itemId }),
      }
    case type === EventTypeEnum.TNA:
      return {
        article_id: id,
        article_title: title,
        ...(itemId && { article_item_id: itemId }),
      }
    default:
      return undefined
  }
}

export default function useCommonEventTracker({
  type,
}: {
  type?: EventTypeEnum
}) {
  const { trackEvent } = useEventTrackingContext()

  const trackLinkSelectkEvent = useCallback(
    ({
      id,
      title,
      buttonName,
      url,
      product,
      contentType,
      itemId,
    }: {
      id: string
      title?: string
      buttonName?: string
      url?: string
      product?: boolean
      contentType?: string
      itemId?: string
    }) => {
      trackEvent({
        fa: {
          action: '링크선택',
          ...getCommonEventParams({ type, id, title, itemId }),
          button_name: buttonName,
          url,
          product,
          contentType,
        },
      })
    },
    [trackEvent, type],
  )

  const trackCouponDownloadEvent = useCallback(
    ({
      id,
      title,
      couponType,
      couponId,
    }: {
      id: string
      title?: string
      couponType: string
      couponId: string
    }) => {
      trackEvent({
        fa: {
          action: '쿠폰받기선택',
          ...getCommonEventParams({ type, id, title }),
          coupon_type: couponType,
          coupon_id: couponId,
        },
      })
    },
    [trackEvent, type],
  )

  const trackCitySelectEvent = useCallback(
    ({
      id,
      title,
      buttonName,
      regionId,
      contentType,
    }: {
      id: string
      title?: string
      buttonName: string
      regionId?: string
      contentType: string
    }) => {
      trackEvent({
        fa: {
          action: '도시선택',
          ...getCommonEventParams({ type, id, title }),
          button_name: buttonName,
          region_id: regionId,
          content_type: contentType,
        },
      })
    },
    [trackEvent, type],
  )

  const trackImageSelectEvent = useCallback(
    ({
      id,
      title,
      url,
      contentType,
    }: {
      id: string
      title?: string
      url?: string
      contentType?: string
    }) => {
      trackEvent({
        fa: {
          action: '이미지선택',
          ...getCommonEventParams({ type, id, title }),
          url,
          content_type: contentType,
        },
      })
    },
    [trackEvent, type],
  )

  const trackPoiSelectEvent = useCallback(
    ({
      id,
      title,
      buttonName,
      url,
      itemId,
      product,
      contentType,
    }: {
      id: string
      title?: string
      buttonName: string
      url: string
      itemId: string
      product: boolean
      contentType: string
    }) => {
      trackEvent({
        fa: {
          action: 'POI선택',
          ...getCommonEventParams({ type, id, title, itemId }),
          button_name: buttonName,
          url,
          product,
          content_type: contentType,
        },
      })
    },
    [trackEvent, type],
  )

  const trackPoiSaveEvent = useCallback(
    ({
      id,
      title,
      itemId,
      contentType,
    }: {
      id: string
      title?: string
      itemId: string
      contentType: string
    }) => {
      trackEvent({
        fa: {
          action: 'POI저장',
          ...getCommonEventParams({ type, id, title, itemId }),
          content_type: contentType,
        },
      })
    },
    [trackEvent, type],
  )
  const trackPoiUnSaveEvent = useCallback(
    ({
      id,
      title,
      itemId,
      contentType,
    }: {
      id: string
      title?: string
      itemId: string
      contentType: string
    }) => {
      trackEvent({
        fa: {
          action: 'POI저장취소',
          ...getCommonEventParams({ type, id, title, itemId }),
          content_type: contentType,
        },
      })
    },
    [trackEvent, type],
  )

  return {
    trackLinkSelectkEvent,
    trackCouponDownloadEvent,
    trackImageSelectEvent,
    trackPoiSaveEvent,
    trackPoiUnSaveEvent,
    trackPoiSelectEvent,
    trackCitySelectEvent,
  }
}
