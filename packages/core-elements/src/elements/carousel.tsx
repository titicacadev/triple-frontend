import styled, { css } from 'styled-components'
import React, {
  PropsWithChildren,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react'
import uniqid from 'uniqid'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { ArrowButton } from '@titicaca/icons'
import NativeFlicking, { FlickingOptions } from '@egjs/flicking'

import { MarginPadding, CarouselSizes } from '../commons'
import { marginMixin } from '../mixins'

import Container from './container'

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
  vertical-align: top;
  white-space: normal;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: ${({ size }) => CAROUSEL_LEFT_SPACING_SIZES[size || 'small']};
  }
`

const CarouselScrollButton = styled.div<{ direction: 'left' | 'right' }>`
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  top: calc(50% - 30px);
  ${({ direction }) =>
    direction === 'left'
      ? css`
          left: -30px;
        `
      : css`
          right: -30px;
        `};
  z-index: 60;
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
const FLICK_ATTRIBUTES: Partial<FlickingOptions> = {
  deceleration: 0.0075,
  horizontal: true,
  circular: true,
  infinite: false,
  infiniteThreshold: 0,
  lastIndex: Infinity,
  threshold: 40,
  duration: 100,
  panelEffect: (x: number) => 1 - Math.pow(1 - x, 3),
  defaultIndex: 0,
  thresholdAngle: 45,
  bounce: 10,
  autoResize: false,
  adaptive: false,
  bound: false,
  overflow: false,
  hanger: '50%',
  anchor: '50%',
  gap: 10,
  moveType: { type: 'snap', count: 1 },
  collectStatistics: true,
  zIndex: 50,
  classPrefix: 'eg-flick',
}

const FlickingContainer = styled.div`
  .eg-flick-panel {
    margin-left: 0 !important;
  }
`

function Carousel({
  margin,
  containerPadding,
  children,
  className,
}: PropsWithChildren<CarouselBaseProps>) {
  const carouselRef = useRef() as React.RefObject<HTMLUListElement>
  const [scrollable, setScrollable] = useState(false)
  const [flicking, setFlicking] = useState<NativeFlicking>()
  const { isMobile } = useUserAgentContext()
  const uniqueId = useMemo(() => uniqid('egjs-flick-'), [])

  useEffect(() => {
    const carouselElement = carouselRef?.current

    if (!carouselElement) {
      return
    }

    if (carouselElement.scrollWidth > carouselElement.clientWidth) {
      setScrollable(true)
    }
  }, [carouselRef])

  useEffect(() => {
    if (scrollable) {
      setFlicking(new NativeFlicking(`.${uniqueId}`, FLICK_ATTRIBUTES))
    }
  }, [scrollable, uniqueId])

  return !isMobile && scrollable ? (
    <Container position="relative" margin={margin} padding={containerPadding}>
      <FlickingContainer className={uniqueId}>{children}</FlickingContainer>
      <CarouselScrollButton direction="left" onClick={() => flicking?.prev()}>
        <ArrowButton direction="left" />
      </CarouselScrollButton>
      <CarouselScrollButton direction="right" onClick={() => flicking?.next()}>
        <ArrowButton direction="right" />
      </CarouselScrollButton>
    </Container>
  ) : (
    <CarouselBase
      ref={carouselRef}
      className={className}
      margin={margin}
      containerPadding={containerPadding}
    >
      {children}
    </CarouselBase>
  )
}

Carousel.Item = CarouselItem

export default Carousel
