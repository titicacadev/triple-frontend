import { FC, useRef, useEffect, useState } from 'react'
import { formatMarginPadding, MarginPadding } from '@titicaca/core-elements'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { FlickingOptions } from '@egjs/flicking'
import Flicking from '@egjs/react-flicking'
import { css } from 'styled-components'

import { Banner } from './typing'
import HorizontalEntity from './horizontal-entity'
import ListSection from './list-section'

interface HorizontalListViewProps {
  banners: Banner[]
  padding?: MarginPadding
  margin?: MarginPadding
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
  padding = {},
  margin,
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
      if (!flickingRef.current?.isPlaying()) {
        onBannerClick(banner, index)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('orientationchange', resizeFlicking)
    window.addEventListener('resize', resizeFlicking)

    return () => {
      window.removeEventListener('orientationchange', resizeFlicking)
      window.removeEventListener('resize', resizeFlicking)
    }
  }, [])

  useEffect(() => {
    resizeFlicking()
  }, [padding.left, padding.right])

  if (banners.length === 0) {
    return null
  }

  return (
    <IntersectionObserver
      onChange={({ isIntersecting }: { isIntersecting: boolean }) => {
        if (isIntersecting && banners.length > 0) {
          onBannerIntersect(true, banners[visibleIndex], visibleIndex)
        }
      }}
    >
      <div>
        <ListSection
          css={css(
            {
              minWidth: 0,
              paddingTop: padding.top,
              paddingBottom: padding.bottom,
            },
            formatMarginPadding(margin, 'margin'),
          )}
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
                  key={banner.id}
                  banner={banner}
                  onClick={makeBannerClickHandler(index)}
                  onLoad={resizeFlicking}
                  widthOffset={Number(padding.left || padding.right || 25) * 2}
                />
              )
            })}
          </Flicking>
        </ListSection>
      </div>
    </IntersectionObserver>
  )
}

export default HorizontalListView
