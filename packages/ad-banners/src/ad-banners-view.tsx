import React, { FC, useRef } from 'react'
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

const AdBannersView: FC<AdBannersViewProps> = ({
  banners,
  padding,
  direction = ListDirection.VERTICAL,
  onIntersectingBanner,
  onClickBanner,
}) => {
  const flickingRef = useRef()

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
            defaultIndex={0}
            autoResize={false}
            horizontal={true}
            bounce={[10, 10]}
            duration={100}
            gap={10}
          >
            {banners.map((banner, index) => {
              return (
                <HorizontalEntity
                  key={banner.id}
                  banner={banner}
                  onClick={makeBannerClickHandler(index)}
                  onChangeIsIntersecting={makeBannerIntersectingHandler(index)}
                />
              )
            })}
          </Flicking>
        </Section>
      )
  }
}

export default AdBannersView
