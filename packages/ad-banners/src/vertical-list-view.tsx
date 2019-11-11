import React, { FC } from 'react'
import { Section, MarginPadding } from '@titicaca/core-elements'

import AdBannerEntity from './ad-banner-entity'
import { Banner } from './typing'

interface VerticalListViewProps {
  banners: Banner[]
  padding?: MarginPadding
  onClickBanner: (banner: Banner, index: number) => void
  onIntersectingBanner: (
    isIntersecting: boolean,
    banner: Banner,
    index: number,
  ) => void
}

const VerticalListView: FC<VerticalListViewProps> = ({
  banners,
  padding,
  onIntersectingBanner,
  onClickBanner,
}) => {
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
}

export default VerticalListView
