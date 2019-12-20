import React, { FC, useState, useEffect } from 'react'
import { MarginPadding } from '@titicaca/core-elements'
import {
  useDeviceContext,
  useEventTrackingContext,
  useHistoryContext,
} from '@titicaca/react-contexts'

import { ContentType, postAdBannerEvent, getAdBanners } from './api'
import { Banner, ListDirection } from './typing'
import HorizontalListView from './horizontal-list-view'
import VerticalListView from './vertical-list-view'

declare global {
  interface Window {
    requestIdleCallback?(callback: () => void, timeout?: number): number
    cancelIdleCallback?(handle: number): void
  }
}

interface EventAttributes {
  title?: string
}

/**
 * 트리플 광고 API를 사용하는 배너의 Props
 */
interface AdSystemBannerProps {
  contentType: ContentType
  contentId: string
  regionId?: string

  eventAttributes?: EventAttributes
}

/**
 * Inventory API를 사용하는 배너의 Props
 */
interface InventoryBannerProps {
  onFetchingBanners: () => Promise<Banner[]>
  onBannerIntersecting?: (
    isIntersecting: boolean,
    banner: Banner,
    index: number,
  ) => void
  onBannerClick?: (banner: Banner, index: number) => void
}

type AdBannersProps = { padding?: MarginPadding; direction?: ListDirection } & (
  | AdSystemBannerProps
  | InventoryBannerProps)

const NOOP = () => {}

const COMPONENT_SET = {
  [ListDirection.VERTICAL]: VerticalListView,
  [ListDirection.HORIZONTAL]: HorizontalListView,
}

function isPropsForInventoryAPI(
  props: AdBannersProps,
): props is InventoryBannerProps {
  return 'onFetchingBanners' in props
}

function useAdBannerProps(props: AdBannersProps) {
  const { latitude, longitude } = useDeviceContext()
  const { trackEvent } = useEventTrackingContext()
  const { navigate } = useHistoryContext()

  if (isPropsForInventoryAPI(props)) {
    const { onFetchingBanners, onBannerIntersecting, onBannerClick } = props

    return {
      getBannersAPI: onFetchingBanners,
      handleBannerIntersecting: onBannerIntersecting || NOOP,
      handleBannerClick: (banner: Banner, index: number) => {
        if (onBannerClick) {
          onBannerClick(banner, index)
        }

        navigate(banner.target)
      },
    }
  } else {
    const {
      contentType,
      contentId,
      regionId,
      eventAttributes: { title },
    } = props

    return {
      getBannersAPI: () =>
        getAdBanners({
          contentType,
          contentId,
          regionId,
          userLocation: { latitude, longitude },
        }),
      handleBannerIntersecting: (
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
          ...{
            contentType,
            contentId,
            regionId,
            userLocation: { latitude, longitude },
          },
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
      },
      handleBannerClick: (banner: Banner, index: number) => {
        postAdBannerEvent({
          eventType: 'click',
          itemId: banner.id,
          ...{
            contentType,
            contentId,
            regionId,
            userLocation: { latitude, longitude },
          },
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
      },
    }
  }
}

const AdBanners: FC<AdBannersProps> = (props) => {
  const { padding, direction = ListDirection.VERTICAL } = props
  const {
    getBannersAPI,
    handleBannerIntersecting,
    handleBannerClick,
  } = useAdBannerProps(props)
  const [banners, setBanners] = useState([])

  const Component = COMPONENT_SET[direction]

  useEffect(() => {
    let isMounted = true
    let handle: number | undefined

    async function fetchBanners() {
      const response = await getBannersAPI()

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

  return (
    <Component
      banners={banners}
      padding={padding}
      onClickBanner={handleBannerClick}
      onIntersectingBanner={handleBannerIntersecting}
    />
  )
}

export default AdBanners
