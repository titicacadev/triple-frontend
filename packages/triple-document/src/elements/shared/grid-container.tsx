import styled from 'styled-components'
import { Fragment, ReactNode } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import {
  Container,
  ImageBlockElementContainer,
  ImageCarouselElementContainer,
} from '@titicaca/core-elements'

import DocumentCarousel from './document-carousel'

const BlockContainer = ({
  children,
  images,
}: {
  children: ReactNode
  images: ImageMeta[]
}) => (
  <Container
    margin={{
      top: 40,
      bottom: images.some(({ title }) => title) ? 10 : 30,
    }}
  >
    {children}
  </Container>
)

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
`

export const imagesContainerMap = {
  block: BlockContainer,
  'gapless-block': Container,
  grid: GridContainer,
  default: DocumentCarousel,
  'default-v2': DocumentCarousel,
}

export const elementContainerMap = {
  block: ImageBlockElementContainer,
  'gapless-block': Container,
  grid: Fragment,
  default: ImageCarouselElementContainer,
  'default-v2': ImageCarouselElementContainer,
}
