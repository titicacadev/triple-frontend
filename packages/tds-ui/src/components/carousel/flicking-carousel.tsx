import { PropsWithChildren, useRef } from 'react'
import type { FlickingProps } from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'
import styled from 'styled-components'
import Flicking from '@egjs/react-flicking'

import { Container } from '../container'
import type { MarginPadding } from '../../commons'

import FlickingCarouselProvider from './flicking-carousel-context'
import { FlickingPageLabel } from './flicking-page-label'
import { FlickingCarouselContent } from './flicking-carousel-content'
import { FlickingCarouselControls } from './flicking-carousel-controls'
import { CarouselItem } from './carousel-item'

interface CarouselBaseProps {
  margin?: MarginPadding
  containerPadding?: { left: number; right: number }
}

interface FlickingEvents {
  onMoveStart?: FlickingProps['onMoveStart']
  onMove?: FlickingProps['onMove']
  onMoveEnd?: FlickingProps['onMoveEnd']
  options?: Partial<FlickingOptions>
}

type FlickingCarouselProps = CarouselBaseProps & FlickingEvents

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
  margin,
  containerPadding,
  onMoveStart,
  onMove,
  onMoveEnd,
  options,
  children,
  ...cssProps
}: PropsWithChildren<FlickingCarouselProps>) {
  const flickingRef = useRef<Flicking>(null)

  return (
    <FlickingCarouselProvider
      ref={flickingRef}
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
