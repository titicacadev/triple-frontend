import styled from 'styled-components'
import { Fragment, PropsWithChildren } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import {
  Container,
  ImageBlockElementContainer,
  ImageCarouselElementContainer,
} from '@titicaca/kint5-core-elements'

import DocumentCarousel from './document-carousel'

function BlockContainer({
  children,
  images,
}: PropsWithChildren<{ images: ImageMeta[] }>) {
  return (
    <Container
      css={{
        marginTop: 40,
        marginBottom: images.some(({ title }) => title) ? 10 : 30,
        marginLeft: 16,
        marginRight: 16,
      }}
    >
      {children}
    </Container>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
  margin: 0 16px;
`

export function DocumentCarouselContainer({
  children,
  images,
}: PropsWithChildren<{ images: ImageMeta[] }>) {
  return (
    <DocumentCarousel
      css={{
        margin: `40px 0 ${images.some(({ title }) => title) ? 10 : 30}px`,
        padding: '0 0 10px 16px',
      }}
    >
      {children}
    </DocumentCarousel>
  )
}

export const IMAGES_CONTAINER_MAP = {
  block: BlockContainer,
  'gapless-block': Container,
  grid: GridContainer,
  default: DocumentCarouselContainer,
  'default-v2': DocumentCarouselContainer,
}

export const ELEMENT_CONTAINER_MAP = {
  block: ImageBlockElementContainer,
  'gapless-block': Container,
  grid: Fragment,
  default: ImageCarouselElementContainer,
  'default-v2': ImageCarouselElementContainer,
}
