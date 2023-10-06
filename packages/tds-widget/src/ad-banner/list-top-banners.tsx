import { FC, useState, useEffect } from 'react'
import { MarginPadding } from '@titicaca/core-elements'
import {
  useDeviceContext,
  useEventTrackingContext,
} from '@titicaca/react-contexts'
import { useNavigate } from '@titicaca/router'

import {
  ContentType,
  postAdBannerEvent,
  getAdBanners,
  BannerTypes,
} from './api'
import { Banner, ListDirection } from './typing'
import HorizontalListView from './horizontal-list-view'
import VerticalListView from './vertical-list-view'

interface EventAttributes {
  title?: string
}

/**
 * 트리플 광고 API를 사용하는 배너의 Props
 */
interface AdSystemBannerProps {
  contentType: ContentType
  contentId?: string
  regionId: string
  eventAttributes?: EventAttributes
}

/**
 * Inventory API를 사용하는 배너의 Props
 */
interface InventoryBannerProps {
  onBannersFetch: () => Promise<Banner[]>
  onBannerIntersect?: (
    isIntersecting: boolean,
    banner: Banner,
    index: number,
  ) => void
  onBannerClick?: (banner: Banner, index: number) => void
}

type AdBannersProps = {
  margin?: MarginPadding
  padding?: MarginPadding
  direction?: ListDirection
} & (AdSystemBannerProps | InventoryBannerProps)

const NOOP = () => {}

const COMPONENT_SET = {
  [ListDirection.Vertical]: VerticalListView,
  [ListDirection.Horizontal]: HorizontalListView,
}

function isPropsForInventoryApi(
  props: AdBannersProps,
): props is InventoryBannerProps {
  return 'onBannersFetch' in props
}

function useAdBannerProps(props: AdBannersProps) {
  const { latitude, longitude } = useDeviceContext()
  const { trackEvent } = useEventTrackingContext()
  const navigate = useNavigate()

  if (isPropsForInventoryApi(props)) {
    const { onBannersFetch, onBannerIntersect, onBannerClick } = props

    return {
      getBannersApi: onBannersFetch,
      handleBannerIntersecting: onBannerIntersect || NOOP,
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
      eventAttributes: { title } = { title: undefined },
    } = props

    return {
      getBannersApi: () =>
        getAdBanners({
          contentType,
          regionId,
          contentId,
          userLocation: { longitude, latitude },
          bannerType: BannerTypes.ListTopBanner,
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
          itemId: banner.id,
          eventType: 'impression',
          regionId,
          bannerType: BannerTypes.ListTopBanner,
        })

        trackEvent({
          fa: {
            action: 'V0_배너노출',
            banner_id: banner.id,
            banner_position: index,
            url: banner.target,
            poi_id: contentId,
          },
        })
      },
      handleBannerClick: (banner: Banner, index: number) => {
        postAdBannerEvent({
          itemId: banner.id,
          eventType: 'click',
          regionId,
          bannerType: BannerTypes.ListTopBanner,
        })

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

        navigate(banner.target)
      },
    }
  }
}

const ListTopBanners: FC<AdBannersProps> = (props) => {
  const { margin, padding, direction = ListDirection.Vertical } = props
  const { getBannersApi, handleBannerIntersecting, handleBannerClick } =
    useAdBannerProps(props)
  const [banners, setBanners] = useState<Banner[]>([])

  const Component = COMPONENT_SET[direction]

  useEffect(() => {
    let handle: number | undefined

    async function fetchBanners() {
      const response = await getBannersApi()

      setBanners(response || [])
    }

    if (window.requestIdleCallback) {
      handle = window.requestIdleCallback(() => {
        fetchBanners()
      })
    } else {
      fetchBanners()
    }

    return () => {
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
      margin={margin}
      onBannerClick={handleBannerClick}
      onBannerIntersect={handleBannerIntersecting}
    />
  )
}

export default ListTopBanners
