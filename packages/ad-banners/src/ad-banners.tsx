import React, { FC, useState, useEffect } from 'react'
import { MarginPadding } from '@titicaca/core-elements'
import {
  useDeviceContext,
  useEventTrackingContext,
  useHistoryContext,
} from '@titicaca/react-contexts'

import AdBannersView from './ad-banners-view'
import { postAdBannerEvent, getAdBanners } from './api'
import { ContentType, Banner } from './typing'

declare global {
  interface Window {
    requestIdleCallback?(callback: () => void, timeout?: number): number
    cancelIdleCallback?(handle: number): void
  }
}

interface EventAttributes {
  title?: string
}

interface AdBannersProps {
  contentType: ContentType
  contentId: string
  regionId?: string

  padding?: MarginPadding

  eventAttributes?: EventAttributes
}

const AdBanners: FC<AdBannersProps> = ({
  contentType,
  contentId,
  regionId,

  padding,

  eventAttributes: { title } = {},
}) => {
  const { latitude, longitude } = useDeviceContext()
  const { trackEvent } = useEventTrackingContext()
  const { navigate } = useHistoryContext()
  const [banners, setBanners] = useState([])

  const baseEventParams = {
    contentType,
    contentId,
    regionId,
    userLocation: { latitude, longitude },
  }

  useEffect(() => {
    let isMounted = true
    let handle: number | undefined

    async function fetchBanners() {
      const response = await getAdBanners(baseEventParams)

      if (isMounted) {
        setBanners(response || [])
      }
    }

    if (window.requestIdleCallback) {
      handle = window.requestIdleCallback(() => {
        fetchBanners()
      })
    } else {
      fetchBanners()
    }

    return () => {
      isMounted = false

      if (handle && window.cancelIdleCallback) {
        window.cancelIdleCallback(handle)
      }
    }
    // HACK: 최초 한 번만 실행
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleBannerIntersecting = (
    isIntersecting: boolean,
    banner: Banner,
    index: number,
  ) => {
    if (!isIntersecting) {
      return
    }

    postAdBannerEvent({
      eventType: 'impression',
      itemId: banner.id,
      ...baseEventParams,
    })

    /* eslint-disable @typescript-eslint/camelcase */
    trackEvent({
      fa: {
        action: 'V0_배너노출',
        banner_id: banner.id,
        banner_position: index,
        url: banner.target,
        poi_id: contentId,
      },
    })
    /* eslint-enable @typescript-eslint/camelcase */
  }

  const handleBannerClick = (banner: Banner, index: number) => {
    postAdBannerEvent({
      eventType: 'click',
      itemId: banner.id,
      ...baseEventParams,
    })

    /* eslint-disable @typescript-eslint/camelcase */
    trackEvent({
      fa: {
        action: 'V0_배너선택',
        banner_id: banner.id,
        banner_position: index,
        url: banner.target,
        poi_id: contentId,
      },
      ga: [
        'V0_배너선택',
        `${title}_${contentId}_${banner.id}_${banner.desc}_${banner.target}`,
      ],
    })
    /* eslint-enable @typescript-eslint/camelcase */

    navigate(banner.target)
  }

  return (
    <AdBannersView
      banners={banners}
      padding={padding}
      onClickBanner={handleBannerClick}
      onIntersectingBanner={handleBannerIntersecting}
    />
  )
}

export default AdBanners
