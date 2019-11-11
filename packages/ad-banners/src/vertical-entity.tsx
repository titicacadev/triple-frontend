import React, { FC } from 'react'
import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'
import IntersectionObserver from '@titicaca/intersection-observer'

import { Banner } from './typing'

interface VerticalEntityProps {
  banner: Banner
  onClick: (banner: Banner) => void
  onChangeIsIntersecting: (isIntersecting: boolean, banner: Banner) => void
}

const BannerImage = styled.img`
  border-radius: 6px;
  width: 100%;
  vertical-align: top;
`

const VerticalEntity: FC<VerticalEntityProps> = ({
  banner,
  onClick,
  onChangeIsIntersecting,
}) => {
  const handleIntersectionChange = ({
    isIntersecting,
  }: IntersectionObserverEntry) => {
    onChangeIsIntersecting(isIntersecting, banner)
  }
  const handleBannerClick = () => {
    onClick(banner)
  }

  return (
    <IntersectionObserver threshold={0.5} onChange={handleIntersectionChange}>
      <Container margin={{ top: 10 }}>
        <BannerImage src={banner.image} onClick={handleBannerClick} />
      </Container>
    </IntersectionObserver>
  )
}

export default VerticalEntity
