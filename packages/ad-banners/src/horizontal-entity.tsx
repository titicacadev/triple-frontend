import React, { FC } from 'react'
import { Banner } from './typing'
import styled from 'styled-components'

interface HorizontalEntityProps {
  banner: Banner
  onClick: (banner: Banner) => void
  onChangeIsIntersecting: (isIntersecting: boolean, banner: Banner) => void
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

const HorizontalEntity: FC<HorizontalEntityProps> = ({ banner }) => {
  return (
    <BannerItem>
      <img src={banner.image} alt={banner.desc} />
    </BannerItem>
  )
}

export default HorizontalEntity
