import styled, { css } from 'styled-components'
import React, { PropsWithChildren } from 'react'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { MarginPadding, CarouselSizes } from '../commons'
import { marginMixin } from '../mixins'

const CAROUSEL_WIDTH_SIZES = {
  small: '140px',
  medium: '153px',
  large: '270px',
  big: '275px',
}

const CAROUSEL_LEFT_SPACING_SIZES = {
  small: '10px',
  medium: '10px',
  large: '15px',
  big: '10px',
}

interface CarouselBaseProps {
  margin?: MarginPadding
  containerPadding?: { left: number; right: number }
  className?: string
}

const CarouselBase = styled.ul<CarouselBaseProps>`
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  ${marginMixin}
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
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

const Item = styled.li<{ size?: CarouselSizes }>`
  display: inline-block;
  position: relative;
  width: ${({ size }) => CAROUSEL_WIDTH_SIZES[size || 'small']};
  margin-left: ${({ size }) => CAROUSEL_LEFT_SPACING_SIZES[size || 'small']};
  vertical-align: top;
  white-space: normal;
  cursor: pointer;
`

function CarouselItem({
  size,
  children,
  threshold,
  onImpress,
  onClick,
  className,
}: PropsWithChildren<{
  className?: string
  size?: CarouselSizes
  threshold?: number
  onImpress?: () => void
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}>) {
  if (onImpress) {
    return (
      <Item onClick={onClick} size={size} className={className}>
        <StaticIntersectionObserver
          threshold={threshold || 0.5}
          onChange={({ isIntersecting }: { isIntersecting: boolean }) => {
            if (isIntersecting) {
              onImpress()
            }
          }}
        >
          <div>{children}</div>
        </StaticIntersectionObserver>
      </Item>
    )
  }

  return (
    <Item onClick={onClick} size={size} className={className}>
      {children}
    </Item>
  )
}

function Carousel({
  margin,
  containerPadding,
  children,
  className,
}: PropsWithChildren<CarouselBaseProps>) {
  return (
    <CarouselBase
      className={className}
      margin={margin}
      containerPadding={containerPadding}
    >
      {children}
    </CarouselBase>
  )
}

Carousel.Item = CarouselItem
/**
 * @deprecated @titicaca/carousel 패키지를 사용해주세요.
 */
export default Carousel
