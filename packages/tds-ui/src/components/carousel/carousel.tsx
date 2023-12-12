import styled, { css } from 'styled-components'
import { PropsWithChildren, useRef } from 'react'

import { marginMixin } from '../../mixins'
import type { MarginPadding } from '../../commons'

import { CarouselItem } from './carousel-item'

interface CarouselBaseProps {
  margin?: MarginPadding
  containerPadding?: { left: number; right: number }
}

const CarouselBase = styled.ul<CarouselBaseProps>`
  padding-bottom: 10px;
  ${marginMixin}
  white-space: nowrap;
  overflow: scroll hidden;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  ${({ containerPadding }) =>
    containerPadding &&
    css`
      li:first-child {
        margin-left: ${containerPadding.left || 0}px;
      }

      li:last-child {
        margin-right: ${containerPadding.right || 0}px;
      }
    `};
`

/**
 * 정의: Only CSS Carousel입니다.
 * 기능: 가로 스크롤만 지원합니다.
 */
export function Carousel({
  margin,
  containerPadding,
  children,
}: PropsWithChildren<CarouselBaseProps>) {
  const carouselRef = useRef<HTMLUListElement>(null)

  return (
    <CarouselBase
      ref={carouselRef}
      margin={margin}
      containerPadding={containerPadding}
    >
      {children}
    </CarouselBase>
  )
}

Carousel.Item = CarouselItem
