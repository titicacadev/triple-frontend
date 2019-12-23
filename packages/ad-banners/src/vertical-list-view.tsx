import React, { FC } from 'react'
import { MarginPadding } from '@titicaca/core-elements'

import VerticalEntity from './vertical-entity'
import { Banner } from './typing'
import ListSection from './list-section'

interface VerticalListViewProps {
  banners: Banner[]
  padding?: MarginPadding
  onBannerClick: (banner: Banner, index: number) => void
  onBannerIntersect: (
    isIntersecting: boolean,
    banner: Banner,
    index: number,
  ) => void
}

const VerticalListView: FC<VerticalListViewProps> = ({
  banners,
  padding,
  onBannerIntersect,
  onBannerClick,
}) => {
  const makeBannerClickHandler = (index: number) => {
    return (banner: Banner) => {
      onBannerClick(banner, index)
    }
  }
  const makeBannerIntersectingHandler = (index: number) => {
    return (isIntersecting: boolean, banner: Banner) => {
      onBannerIntersect(isIntersecting, banner, index)
    }
  }

  if (banners.length === 0) {
    return null
  }

  return (
    <ListSection minWidth={0} padding={padding}>
      {banners.map((banner, index) => (
        <VerticalEntity
          key={banner.id}
          banner={banner}
          onClick={makeBannerClickHandler(index)}
          onIntersect={makeBannerIntersectingHandler(index)}
        />
      ))}
    </ListSection>
  )
}

export default VerticalListView
