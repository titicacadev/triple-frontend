import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { Container } from '../container'

import {
  type FlickingCarouselProps,
  FlickingCarouselProvider,
} from './flicking-carousel-context'
import { FlickingPageLabel } from './flicking-page-label'
import { FlickingCarouselContent } from './flicking-carousel-content'
import { FlickingCarouselControls } from './flicking-carousel-controls'
import { CarouselItem } from './carousel-item'

const CarouselContainer = styled(Container)`
  overflow: visible;

  img {
    pointer-events: none;
  }
`

export function FlickingCarousel({
  currentPage,
  onMoveStart,
  onMove,
  onMoveEnd,
  options,
  children,
  ...cssProps
}: PropsWithChildren<FlickingCarouselProps>) {
  return (
    <FlickingCarouselProvider
      currentPage={currentPage}
      onMoveStart={onMoveStart}
      onMove={onMove}
      onMoveEnd={onMoveEnd}
      options={options}
    >
      <CarouselContainer position="relative" {...cssProps}>
        {children}
      </CarouselContainer>
    </FlickingCarouselProvider>
  )
}

FlickingCarousel.PageLabel = FlickingPageLabel
FlickingCarousel.Content = FlickingCarouselContent
FlickingCarousel.Controls = FlickingCarouselControls
FlickingCarousel.Item = CarouselItem
