import styled from 'styled-components'
import { Fragment, PropsWithChildren } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import {
  Container,
  ImageBlockElementContainer,
  ImageCarouselElementContainer,
} from '@titicaca/core-elements'

import DocumentCarousel from './document-carousel'

function BlockContainer({
  children,
  images,
}: PropsWithChildren<{ images: ImageMeta[] }>) {
  return (
    <Container
      margin={{
        top: 40,
        bottom: images.some(({ title }) => title) ? 10 : 30,
      }}
    >
      {children}
    </Container>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
`

export const IMAGES_CONTAINER_MAP = {
  block: BlockContainer,
  'gapless-block': Container,
  grid: GridContainer,
  default: DocumentCarousel,
  'default-v2': DocumentCarousel,
}

export const ELEMENT_CONTAINER_MAP = {
  block: ImageBlockElementContainer,
  'gapless-block': Container,
  grid: Fragment,
  default: ImageCarouselElementContainer,
  'default-v2': ImageCarouselElementContainer,
}
