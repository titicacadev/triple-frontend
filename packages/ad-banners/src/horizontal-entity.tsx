import React, { FC } from 'react'
import styled from 'styled-components'

import { Banner } from './typing'

interface HorizontalEntityProps {
  banner: Banner
  onClick: (banner: Banner) => void
  onLoad: () => void
  widthOffset?: number
}

const BannerItem = styled.a<{ widthOffset: number }>`
  position: absolute;
  left: -10000px;
  display: block;
  width: ${({ widthOffset }) => `calc(100% - ${widthOffset}px)`};

  > img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`

const HorizontalEntity: FC<HorizontalEntityProps> = ({
  banner,
  onLoad,
  onClick,
  widthOffset,
}) => {
  return (
    <BannerItem
      onClick={(e) => {
        e.preventDefault()

        onClick(banner)
      }}
      widthOffset={widthOffset}
    >
      <img src={banner.image} alt={banner.desc} onLoad={onLoad} />
    </BannerItem>
  )
}

export default HorizontalEntity
