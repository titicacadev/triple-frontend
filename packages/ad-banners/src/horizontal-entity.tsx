import React, { FC } from 'react'
import styled from 'styled-components'

import { Banner } from './typing'

interface HorizontalEntityProps {
  banner: Banner
  onClick: (banner: Banner) => void
  onLoad: () => void
}

const BannerItem = styled.a`
  position: absolute;
  left: -10000px;
  display: block;
  width: calc(100% - 50px);

  > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`

const HorizontalEntity: FC<HorizontalEntityProps> = ({ banner, onLoad }) => {
  return (
    <BannerItem>
      <img src={banner.image} alt={banner.desc} onLoad={onLoad} />
    </BannerItem>
  )
}

export default HorizontalEntity
