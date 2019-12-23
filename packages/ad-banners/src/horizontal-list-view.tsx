import React, { FC, useRef, useEffect, useState } from 'react'
import { MarginPadding } from '@titicaca/core-elements'
import { FlickingOptions } from '@egjs/flicking'
import Flicking from '@egjs/react-flicking'

import { Banner } from './typing'
import HorizontalEntity from './horizontal-entity'
import ListSection from './list-section'

interface HorizontalListViewProps {
  banners: Banner[]
  padding?: MarginPadding
  onBannerClick: (banner: Banner, index: number) => void
  onBannerIntersect: (
    isIntersecting: boolean,
    banner: Banner,
    index: number,
  ) => void
}

const FLICKING_DEFAULT_INDEX = 0
const FLICKING_CONFIG: Partial<FlickingOptions> = {
  collectStatistics: false,
  zIndex: 1,
  defaultIndex: FLICKING_DEFAULT_INDEX,
  autoResize: false,
  horizontal: true,
  bounce: [10, 10],
  duration: 100,
  gap: 10,
}

const HorizontalListView: FC<HorizontalListViewProps> = ({
  banners,
  padding,
  onBannerIntersect,
  onBannerClick,
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
      onBannerClick(banner, index)
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
      onBannerIntersect(
        true,
        banners[FLICKING_DEFAULT_INDEX],
        FLICKING_DEFAULT_INDEX,
      )
    }
  }, [banners]) // eslint-disable-line react-hooks/exhaustive-deps

  if (banners.length === 0) {
    return null
  }

  return (
    <ListSection
      minWidth={0}
      padding={{ top: padding.top, bottom: padding.bottom }}
    >
      <Flicking
        {...FLICKING_CONFIG}
        ref={flickingRef}
        onMoveEnd={(e) => {
          const newIndex = e.index

          onBannerIntersect(false, banners[visibleIndex], visibleIndex)
          onBannerIntersect(true, banners[newIndex], newIndex)
          setVisibleIndex(newIndex)
        }}
      >
        {banners.map((banner, index) => {
          return (
            <HorizontalEntity
              key={banner.id + index}
              banner={banner}
              onClick={makeBannerClickHandler(index)}
              onLoad={resizeFlicking}
              widthOffset={Number(padding.left || padding.right) * 2 || 25}
            />
          )
        })}
      </Flicking>
    </ListSection>
  )
}

export default HorizontalListView
