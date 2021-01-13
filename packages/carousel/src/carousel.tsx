import styled, { css } from 'styled-components'
import React, {
  PropsWithChildren,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react'
import uniqid from 'uniqid'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { ArrowButton } from '@titicaca/icons'
import { Container, MarginPadding, marginMixin } from '@titicaca/core-elements'
import NativeFlicking, { FlickingOptions } from '@egjs/flicking'

import CarouselItem from './carousel-item'

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
