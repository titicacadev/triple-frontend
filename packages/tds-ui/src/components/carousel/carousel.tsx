import { css, styled } from 'styled-components'
import { PropsWithChildren, useRef } from 'react'

import { marginMixin, MarginMixinProps } from '../../mixins'

import { CarouselItem } from './carousel-item'

interface CarouselBaseProps extends MarginMixinProps {
  containerPadding?: { left: number; right: number }
}

const CarouselBase = styled.ul<CarouselBaseProps>`
  padding-bottom: 10px;
  ${marginMixin}
  white-space: nowrap;
  overflow: scroll hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
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

export type CarouselProps = PropsWithChildren<CarouselBaseProps>

export function Carousel({
  children,
  margin,
  containerPadding,
  ...props
}: PropsWithChildren<CarouselProps>) {
  const carouselRef = useRef<HTMLUListElement>(null)

  return (
    <CarouselBase
      ref={carouselRef}
      margin={margin}
      containerPadding={containerPadding}
      {...props}
    >
      {children}
    </CarouselBase>
  )
}

Carousel.Item = CarouselItem
