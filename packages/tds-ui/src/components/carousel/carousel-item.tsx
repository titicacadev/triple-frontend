import { MouseEventHandler, PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { CarouselSizes } from '../../commons'

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

const Item = styled.li<{ size?: CarouselSizes }>`
  display: inline-block;
  position: relative;
  width: ${({ size }) => CAROUSEL_WIDTH_SIZES[size || 'small']};
  vertical-align: top;
  white-space: normal;
  cursor: pointer;

  &:not(:first-child) {
    margin-left: ${({ size }) => CAROUSEL_LEFT_SPACING_SIZES[size || 'small']};
  }
`

export function CarouselItem({
  size,
  children,
  threshold,
  onImpress,
  onClick,
}: PropsWithChildren<{
  size?: CarouselSizes
  threshold?: number
  onImpress?: () => void
  onClick?: MouseEventHandler<HTMLLIElement>
}>) {
  if (onImpress) {
    return (
      <Item onClick={onClick} size={size}>
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
    <Item onClick={onClick} size={size}>
      {children}
    </Item>
  )
}
