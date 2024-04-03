import { MouseEvent, TouchEvent, useState } from 'react'
import styled from 'styled-components'
import { Container, FlexBox, Image } from '@titicaca/kint5-core-elements'
import { FrameRatioAndSizes } from '@titicaca/type-definitions'

import { MediumMeta } from './types'
import { Medium } from './medium'

export type OnMediumClickFn = ({
  medium,
  index,
}: {
  medium: MediumMeta
  index: number
}) => void

interface CarouselProps {
  currentMediumIndex: number
  media: MediumMeta[]
  frame: FrameRatioAndSizes
  onSlide: (mediaIndex: number) => void
  onMediumClick?: OnMediumClickFn
}

const CarouselContainer = styled(Container)`
  overflow: hidden;
`

const CarouselItemWrapper = styled(FlexBox)<{
  currentMediumIndex: number
}>`
  transition: transform 200ms ease-in-out;
  transform: translateX(
    calc(-${({ currentMediumIndex }) => currentMediumIndex} * 100%)
  );
`

export function MediaPopupCarousel({
  currentMediumIndex,
  media,
  frame,
  onSlide,
  onMediumClick,
}: CarouselProps) {
  const [startX, setStartX] = useState(0)
  const [dragX, setDragX] = useState(0)

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setStartX(event.touches[0].clientX)
  }

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setStartX(event.clientX)
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setDragX(event.touches[0].clientX - startX)
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) {
      return
    }

    setDragX(event.clientX - startX)
  }

  const handleDragEnd = () => {
    if (dragX > 15 && currentMediumIndex > 0) {
      onSlide(currentMediumIndex - 1)
    } else if (dragX < -15 && currentMediumIndex < media.length - 1) {
      onSlide(currentMediumIndex + 1)
    }

    setStartX(0)
    setDragX(0)
  }

  return (
    <CarouselContainer
      position="relative"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      css={{
        width: '100%',
        height: 'calc(100dvh - 44px)',
        maxWidth: 768,
        margin: '0 auto',
      }}
    >
      <CarouselItemWrapper
        flex
        alignItems="center"
        css={{ width: '100%', height: '100%' }}
        currentMediumIndex={currentMediumIndex}
      >
        {media.map((medium, index) => (
          <Container key={medium.id} css={{ width: '100%', flex: '0 0 100%' }}>
            <Image borderRadius={0}>
              <Image.FixedRatioFrame
                frame={frame}
                onClick={
                  onMediumClick
                    ? () => onMediumClick({ medium, index })
                    : undefined
                }
                css={{ backgroundColor: 'var(--color-kint5-gray0)' }}
              >
                <Medium medium={medium} />
              </Image.FixedRatioFrame>
            </Image>
          </Container>
        ))}
      </CarouselItemWrapper>
    </CarouselContainer>
  )
}
