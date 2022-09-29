import { ReactNode, RefObject, useState } from 'react'
import styled from 'styled-components'
import { FlickingEvent, FlickingOptions } from '@egjs/flicking'
import Flicking, { FlickingProps } from '@egjs/react-flicking'
import {
  Container,
  formatMarginPadding,
  MarginPadding,
} from '@titicaca/core-elements'

export interface CarouselProps
  extends Partial<FlickingProps & FlickingOptions> {
  flickingRef: RefObject<Flicking>
  margin?: MarginPadding
  borderRadius?: number
  pageLabelRenderer: (params: { currentIndex: number }) => ReactNode
}

const CarouselContainer = styled(Container)`
  overflow: visible;

  img {
    pointer-events: none;
  }
`
const TopRightControl = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

function Carousel({
  margin,
  borderRadius,
  pageLabelRenderer,
  children,
  flickingRef,
  zIndex = 1,
  defaultIndex = 0,
  autoResize = true,
  horizontal = true,
  bounce = [0, 0],
  duration = 100,
  onMoveStart,
  onMove,
  onMoveEnd,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  const handleMoveStart = (e: FlickingEvent) => {
    onMoveStart?.(e)
  }

  const handleMove = (e: FlickingEvent) => {
    onMove?.(e)
  }

  const handleMoveEnd = (e: FlickingEvent) => {
    setCurrentIndex(e.index)

    onMoveEnd?.(e)
  }

  const flickingProps = {
    zIndex,
    defaultIndex,
    autoResize,
    horizontal,
    bounce,
    duration,
    collectStatistics: false,
  }

  const PageLabel = pageLabelRenderer({ currentIndex })

  return (
    <CarouselContainer
      position="relative"
      borderRadius={borderRadius}
      css={formatMarginPadding(margin, 'margin')}
    >
      <Flicking
        ref={flickingRef}
        onMoveStart={handleMoveStart}
        onMove={handleMove}
        onMoveEnd={handleMoveEnd}
        {...flickingProps}
      >
        {children}
      </Flicking>

      {PageLabel ? <TopRightControl>{PageLabel}</TopRightControl> : null}
    </CarouselContainer>
  )
}

export default Carousel
