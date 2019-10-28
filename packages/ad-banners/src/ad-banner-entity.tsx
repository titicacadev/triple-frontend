import React, { FC } from 'react'
import styled from 'styled-components'
import { Container, MarginPadding } from '@titicaca/core-elements'
import IntersectionObserver from '@titicaca/intersection-observer'

import { Banner } from './typing'

interface AdBannerEntityProps {
  banner: Banner
  onClick: (banner: Banner) => void
  onChangeIsIntersecting: (isIntersecting: boolean, banner: Banner) => void
  margin?: MarginPadding
}

const BannerImage = styled.img`
  border-radius: 6px;
  width: 100%;
  margin-top: 10px;
  vertical-align: top;
`

const AdBannerEntity: FC<AdBannerEntityProps> = ({
  banner,
  onClick,
  onChangeIsIntersecting,
  margin,
}) => {
  const handleIntersectionChange = (isIntersecting: boolean) => {
    onChangeIsIntersecting(isIntersecting, banner)
  }
  const handleBannerClick = () => {
    onClick(banner)
  }

  return (
    <IntersectionObserver threshold={0.5} onChange={handleIntersectionChange}>
      <Container margin={margin}>
        <BannerImage src={banner.image} onClick={handleBannerClick} />
      </Container>
    </IntersectionObserver>
  )
}

export default AdBannerEntity
