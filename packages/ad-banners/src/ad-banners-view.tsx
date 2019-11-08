import React, { FC, useRef, useEffect, useState } from 'react'
import { Section, MarginPadding } from '@titicaca/core-elements'
import Flicking from '@egjs/react-flicking'

import AdBannerEntity from './ad-banner-entity'
import { Banner, ListDirection } from './typing'
import HorizontalEntity from './horizontal-entity'

interface AdBannersViewProps {
  banners: Banner[]
  padding?: MarginPadding
  direction: ListDirection
  onClickBanner: (banner: Banner, index: number) => void
  onIntersectingBanner: (
    isIntersecting: boolean,
    banner: Banner,
    index: number,
  ) => void
}

const FLICKING_DEFAULT_INDEX = 0

const AdBannersView: FC<AdBannersViewProps> = ({
  banners,
  padding,
  direction = ListDirection.VERTICAL,
  onIntersectingBanner,
  onClickBanner,
}) => {
  const [visibleIndex, setVisibleIndex] = useState(FLICKING_DEFAULT_INDEX)
  const flickingRef = useRef<Flicking | null>(null)

  const resizeFlicking = () => {
    if (!flickingRef.current) {
      return
    }

    flickingRef.current.resize()
  }

  const makeBannerClickHandler = (index: number) => {
    return (banner: Banner) => {
      onClickBanner(banner, index)
    }
  }
  const makeBannerIntersectingHandler = (index: number) => {
    return (isIntersecting: boolean, banner: Banner) => {
      onIntersectingBanner(isIntersecting, banner, index)
    }
  }

  useEffect(() => {
    resizeFlicking()

    window.addEventListener('orientationchange', resizeFlicking)
    window.addEventListener('resize', resizeFlicking)

    return () => {
      window.removeEventListener('orientationchange', resizeFlicking)
      window.removeEventListener('resize', resizeFlicking)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (banners.length > 0) {
      onIntersectingBanner(
        true,
        banners[FLICKING_DEFAULT_INDEX],
        FLICKING_DEFAULT_INDEX,
      )
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (banners.length === 0) {
    return null
  }

  switch (direction) {
    case ListDirection.VERTICAL:
      return (
        <Section minWidth={0} padding={padding}>
          {banners.map((banner, index) => (
            <AdBannerEntity
              key={banner.id}
              banner={banner}
              onClick={makeBannerClickHandler(index)}
              onChangeIsIntersecting={makeBannerIntersectingHandler(index)}
            />
          ))}
        </Section>
      )
    case ListDirection.HORIZONTAL:
      return (
        <Section minWidth={0} padding={padding}>
          <Flicking
            ref={flickingRef}
            collectStatistics={false}
            zIndex={1}
            defaultIndex={FLICKING_DEFAULT_INDEX}
            autoResize={false}
            horizontal={true}
            bounce={[10, 10]}
            duration={100}
            gap={10}
            onMoveEnd={(e) => {
              const newIndex = e.index

              onIntersectingBanner(false, banners[visibleIndex], visibleIndex)
              onIntersectingBanner(true, banners[newIndex], newIndex)
              setVisibleIndex(newIndex)
            }}
          >
            {banners.map((banner, index) => {
              return (
                <HorizontalEntity
                  key={banner.id}
                  banner={banner}
                  onClick={makeBannerClickHandler(index)}
                  onLoad={resizeFlicking}
                />
              )
            })}
          </Flicking>
        </Section>
      )
  }
}

export default AdBannersView
