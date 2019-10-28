import React, { FC } from 'react'
import styled from 'styled-components'
import { Container, MarginPadding } from '@titicaca/core-elements'
import IntersectionObserver from '@titicaca/intersection-observer'

import { Banner } from './typing'

interface AdBannerEntityProps {
  banner: Banner
  onClick: () => void
  onChangeIsIntersecting: (isIntersecting: boolean) => void
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
  return (
    <IntersectionObserver threshold={0.5} onChange={onChangeIsIntersecting}>
      <Container margin={margin}>
        <BannerImage src={banner.image} onClick={onClick} />
      </Container>
    </IntersectionObserver>
  )
}

export default AdBannerEntity
