import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import Flicking from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'

import { useFlickingCarousel } from './flicking-carousel-context'

const FlickingContainer = styled.div`
  .eg-flick-panel {
    margin-left: 0 !important;
  }
`

const FLICKING_OPTIONS: Partial<FlickingOptions> = {
  circular: true,
  gap: 10,
  collectStatistics: false,
  zIndex: 1,
}

export function FlickingCarouselContent({
  children,
}: PropsWithChildren<unknown>) {
  const { flickingRef, options, handleMoveStart, handleMove, handleMoveEnd } =
    useFlickingCarousel()

  const mergedOptions = {
    ...FLICKING_OPTIONS,
    ...options,
  }

  return (
    <FlickingContainer>
      <Flicking
        ref={flickingRef}
        onMoveStart={handleMoveStart}
        onMove={handleMove}
        onMoveEnd={handleMoveEnd}
        {...mergedOptions}
      >
        {children}
      </Flicking>
    </FlickingContainer>
  )
}
