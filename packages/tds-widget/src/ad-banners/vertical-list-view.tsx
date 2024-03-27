import { FC } from 'react'
import { css } from 'styled-components'
import { formatMarginPadding, MarginPadding } from '@titicaca/core-elements'

import VerticalEntity from './vertical-entity'
import { Banner } from './typing'
import ListSection from './list-section'

interface VerticalListViewProps {
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

const VerticalListView: FC<VerticalListViewProps> = ({
  banners,
  padding,
  margin,
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
    <ListSection
      css={css(
        {
          minWidth: 0,
        },
        formatMarginPadding(margin, 'margin'),
        formatMarginPadding(padding, 'padding'),
      )}
    >
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
