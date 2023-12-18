import styled from 'styled-components'
import { PropsWithChildren, useRef } from 'react'

import { CarouselItem } from './carousel-item'

const CarouselBase = styled.ul`
  padding-bottom: 10px;
  white-space: nowrap;
  overflow: scroll hidden;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`

export function Carousel({
  children,
  ...cssProps
}: PropsWithChildren<unknown>) {
  const carouselRef = useRef<HTMLUListElement>(null)

  return (
    <CarouselBase ref={carouselRef} {...cssProps}>
      {children}
    </CarouselBase>
  )
}

Carousel.Item = CarouselItem
