import styled from 'styled-components'
import { Fragment, PropsWithChildren } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import {
  Container,
  ImageBlockElementContainer,
  ImageCarouselElementContainer,
} from '@titicaca/core-elements'

import DocumentCarousel from './document-carousel'

const BlockContainerStyled = styled(Container)<{ $marginBottom: number }>`
  margin-top: 40px;
  margin-bottom: ${({ $marginBottom }) => $marginBottom}px;
`

function BlockContainer({
  children,
  images,
}: PropsWithChildren<{ images: ImageMeta[] }>) {
  const marginBottom = images.some(({ title }) => title) ? 10 : 30
  return (
    <BlockContainerStyled $marginBottom={marginBottom}>
      {children}
    </BlockContainerStyled>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
`

function GaplessBlockContainer({
  children,
}: PropsWithChildren<{ images: ImageMeta[] }>) {
  return <Container>{children}</Container>
}

export function DocumentCarouselContainer({
  children,
  images,
}: PropsWithChildren<{ images: ImageMeta[] }>) {
  return (
    <DocumentCarousel
      margin={{
        top: 40,
        bottom: images.some(({ title }) => title) ? 10 : 30,
      }}
    >
      {children}
    </DocumentCarousel>
  )
}

export const IMAGES_CONTAINER_MAP = {
  block: BlockContainer,
  'gapless-block': GaplessBlockContainer,
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
