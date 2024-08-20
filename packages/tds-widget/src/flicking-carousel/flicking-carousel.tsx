import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { css, styled } from 'styled-components'
import Flicking from '@egjs/react-flicking'
import {
  Carousel,
  Container,
  formatMarginPadding,
  marginMixin,
  MarginPadding,
} from '@titicaca/tds-ui'
import { useUserAgent } from '@titicaca/triple-web'
import { FlickingOptions } from '@egjs/flicking'

import { ArrowIcon } from './arrow-icon'

interface CarouselBaseProps {
  margin?: MarginPadding
  containerPadding?: { left: number; right: number }
}

export type FlickingCarouselProps = PropsWithChildren<CarouselBaseProps>

const CarouselBase = styled.ul<CarouselBaseProps>`
  ${marginMixin}
  padding-bottom: 10px;
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

const FlickingScrollButton = styled.button<{
  direction: 'left' | 'right'
  containerPadding?: { left: number; right: number }
}>`
  position: absolute;
  width: 60px;
  height: 60px;
  top: calc(50% - 30px);
  ${({ direction, containerPadding }) => css`
    ${direction}: ${(containerPadding?.[direction] || 0) - 30}px;
  `}
  z-index: 60;
  outline: none;
`

const FlickingContainer = styled.div`
  .eg-flick-panel {
    margin-left: 0 !important;
  }
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
  collectStatistics: false,
  zIndex: 50,
  classPrefix: 'eg-flick',
}

export function FlickingCarousel({
  children,
  margin,
  containerPadding,
  ...props
}: FlickingCarouselProps) {
  const carouselRef = useRef<HTMLUListElement>(null)
  const flickingRef = useRef<Flicking>(null)
  const [scrollable, setScrollable] = useState(false)
  const { isMobile } = useUserAgent()

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
      {...props}
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
      margin={margin}
      containerPadding={containerPadding}
      {...props}
    >
      {children}
    </CarouselBase>
  )
}

FlickingCarousel.Item = Carousel.Item
