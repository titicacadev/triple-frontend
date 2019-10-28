import React, { FC } from 'react'
import { Section, MarginPadding } from '@titicaca/core-elements'

import AdBannerEntity from './ad-banner-entity'
import { Banner } from './typing'

interface AdBannersProps {
  banners: Banner[]
  padding?: MarginPadding
  bannerMargin?: MarginPadding
}

const AdBanners: FC<AdBannersProps> = ({ banners, padding, bannerMargin }) => {
  if (banners.length === 0) {
    return null
  }

  return (
    <Section padding={padding}>
      {banners.map((banner) => (
        <AdBannerEntity
          key={banner.id}
          banner={banner}
          onClick={() => {}}
          onChangeIsIntersecting={() => {}}
          margin={bannerMargin}
        />
      ))}
    </Section>
  )
}

export default AdBanners
