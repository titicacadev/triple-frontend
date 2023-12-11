import { PropsWithChildren, useRef } from 'react'
import styled, { css } from 'styled-components'
import Flicking from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'

import { Container } from '../container'
import { formatMarginPadding } from '../../mixins'
import type { MarginPadding } from '../../commons'

import ArrowIcon from './arrow-icon'
import { CarouselItem } from './carousel-item'

interface FlickingCarouselProps {
  margin?: MarginPadding
  containerPadding?: { left: number; right: number }
}

const FlickingContainer = styled.div`
  .eg-flick-panel {
    margin-left: 0 !important;
  }
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
  margin,
  containerPadding,
  children,
}: PropsWithChildren<FlickingCarouselProps>) {
  const flickingRef = useRef<Flicking>(null)

  return (
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
  )
}

FlickingCarousel.Item = CarouselItem
