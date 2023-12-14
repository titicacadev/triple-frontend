import { PropsWithChildren } from 'react'
import type { FlickingProps } from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'
import styled from 'styled-components'

import { Container } from '../container'

import { FlickingCarouselProvider } from './flicking-carousel-context'
import { FlickingPageLabel } from './flicking-page-label'
import { FlickingCarouselContent } from './flicking-carousel-content'
import { FlickingCarouselControls } from './flicking-carousel-controls'
import { CarouselItem } from './carousel-item'

interface FlickingEvents {
  onMoveStart?: FlickingProps['onMoveStart']
  onMove?: FlickingProps['onMove']
  onMoveEnd?: FlickingProps['onMoveEnd']
  options?: Partial<FlickingOptions>
}

type FlickingCarouselProps = FlickingEvents

const CarouselContainer = styled(Container)`
  overflow: visible;

  img {
    pointer-events: none;
  }
`

/**
 * 정의: @egjs/flicking를 적용한 Carousel입니다.
 * 기능: 가로 스크롤 지원, 좌/우 화살표 지원
 */
export function FlickingCarousel({
  onMoveStart,
  onMove,
  onMoveEnd,
  options,
  children,
  ...cssProps
}: PropsWithChildren<FlickingCarouselProps>) {
  return (
    <FlickingCarouselProvider
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
