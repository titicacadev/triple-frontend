import { FC } from 'react'
import { styled } from 'styled-components'
import { Container } from '@titicaca/tds-ui'
import { InView } from 'react-intersection-observer'

import { Banner } from './typing'

interface VerticalEntityProps {
  banner: Banner
  onClick: (banner: Banner) => void
  onIntersect: (isIntersecting: boolean, banner: Banner) => void
}

const BannerImage = styled.img`
  width: 100%;
  vertical-align: top;
`

export const VerticalEntity: FC<VerticalEntityProps> = ({
  banner,
  onClick,
  onIntersect,
}) => {
  const handleIntersectionChange = (inView: boolean) => {
    onIntersect(inView, banner)
  }
  const handleBannerClick = () => {
    onClick(banner)
  }

  return (
    <InView threshold={0.5} onChange={handleIntersectionChange}>
      <Container
        borderRadius={6}
        css={{
          margin: '10px 0 0',
        }}
      >
        <BannerImage src={banner.image} onClick={handleBannerClick} />
      </Container>
    </InView>
  )
}
