import styled, { css } from 'styled-components'
import { PropsWithChildren, useRef, useEffect, useState } from 'react'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { ArrowIcon } from '@titicaca/icons'
import {
  Container,
  MarginPadding,
  marginMixin,
  formatMarginPadding,
} from '@titicaca/core-elements'
import Flicking, {
  FlickingProps,
  FlickingOptions,
  MOVE_TYPE,
} from '@egjs/react-flicking'

import CarouselItem from './carousel-item'

interface CarouselBaseProps {
  margin?: MarginPadding
  containerPadding?: { left: number; right: number }
  className?: string
}

const CarouselBase = styled.ul<CarouselBaseProps>`
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

const FlickingScrollButton = styled.button<{
  direction: 'left' | 'right'
  containerPadding?: { left: number; right: number }
}>`
  position: absolute;
  width: 60px;
  height: 60px;
  top: calc(50% - 30px);
  ${({ direction, containerPadding }) =>
    css`
      ${direction}: ${(containerPadding?.[direction] || 0) - 30}px;
    `}
  z-index: 60;
  outline: none;
`

const FLICK_ATTRIBUTES: Partial<FlickingProps & FlickingOptions> = {
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
  moveType: [MOVE_TYPE.SNAP, { count: 1 }],
  collectStatistics: false,
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
  const carouselRef = useRef<HTMLUListElement>(null)
  const flickingRef = useRef<Flicking>(null)
  const [scrollable, setScrollable] = useState(false)
  const { isMobile } = useUserAgentContext()

  useEffect(() => {
    const carouselElement = carouselRef.current

    if (!carouselElement) {
      return
    }

    if (carouselElement.scrollWidth > carouselElement.clientWidth) {
      setScrollable(true)
    }
  }, [carouselRef])

  return !isMobile && scrollable ? (
    <Container
      position="relative"
      css={css`
        ${formatMarginPadding(margin, 'margin')}
        ${formatMarginPadding(containerPadding, 'padding')}
      `}
    >
      <FlickingScrollButton
        containerPadding={containerPadding}
        direction="left"
        onClick={() => flickingRef.current?.prev()}
      >
        <ArrowIcon direction="left" />
      </FlickingScrollButton>
      <FlickingContainer>
        <Flicking ref={flickingRef} {...FLICK_ATTRIBUTES}>
          {children}
        </Flicking>
      </FlickingContainer>
      <FlickingScrollButton
        containerPadding={containerPadding}
        direction="right"
        onClick={() => flickingRef.current?.next()}
      >
        <ArrowIcon direction="right" />
      </FlickingScrollButton>
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
