import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Flicking from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'

import { useFlickingCarousel } from './flicking-carousel-context'

const FlickingContainer = styled.div`
  .eg-flick-panel {
    margin-left: 0 !important;
  }
`

const FLICKING_OPTIONS: Partial<FlickingOptions> = {
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
  zIndex: 1,
  classPrefix: 'eg-flick',
}

export function FlickingCarouselContent({
  children,
}: PropsWithChildren<unknown>) {
  const { flickingRef, options, onMoveStart, onMove, onMoveEnd } =
    useFlickingCarousel()

  const flickingOptions = options ?? FLICKING_OPTIONS

  return (
    <FlickingContainer>
      <Flicking
        ref={flickingRef}
        onMoveStart={onMoveStart}
        onMove={onMove}
        onMoveEnd={onMoveEnd}
        {...flickingOptions}
      >
        {children}
      </Flicking>
    </FlickingContainer>
  )
}
