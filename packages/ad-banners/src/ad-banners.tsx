import React, { FC, useState, useEffect } from 'react'
import { MarginPadding } from '@titicaca/core-elements'
import { useDeviceContext, useHistoryContext } from '@titicaca/react-contexts'

import AdBannersView from './ad-banners-view'
import { postAdBannerEvent, getAdBanners } from './api'
import { ContentType, Banner } from './typing'

declare global {
  interface Window {
    requestIdleCallback?(callback: () => void, timeout?: number): number
    cancelIdleCallback?(handle: number): void
  }
}

type TrackEvent = (banner: Banner, index: number) => void

interface AdBannersProps {
  contentType: ContentType
  contentId: string
  regionId: string

  contentTitle: string
  poiId: string

  padding?: MarginPadding
  bannerMargin?: MarginPadding

  trackEvent?: {
    onImpress?: TrackEvent
    onClick?: TrackEvent
  }
}

const NOOP = () => {}

const AdBanners: FC<AdBannersProps> = ({
  contentType,
  contentId,
  regionId,

  padding,
  bannerMargin,

  trackEvent: { onImpress, onClick } = {
    onImpress: NOOP,
    onClick: NOOP,
  },
}) => {
  const { latitude, longitude } = useDeviceContext()
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

    onImpress(banner, index)
  }

  const handleBannerClick = (banner: Banner, index: number) => {
    postAdBannerEvent({
      eventType: 'click',
      itemId: banner.id,
      ...baseEventParams,
    })

    onClick(banner, index)

    navigate(banner.target)
  }

  return (
    <AdBannersView
      banners={banners}
      padding={padding}
      bannerMargin={bannerMargin}
      onClickBanner={handleBannerClick}
      onIntersectingBanner={handleBannerIntersecting}
    />
  )
}

export default AdBanners
