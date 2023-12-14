import { ReactElement } from 'react'
import styled from 'styled-components'

import ArrowIcon from './arrow-icon'
import { useFlickingCarousel } from './flicking-carousel-context'

const FlickingScrollButton = styled.button<{
  direction: 'left' | 'right'
  containerPadding?: { left: number; right: number }
}>`
  position: absolute;
  width: 60px;
  height: 60px;
  top: calc(50% - 30px);
  ${({ direction }) => `${direction}: -30px;`}
  z-index: 60;
  outline: none;
`

export function FlickingCarouselControls({
  prevButton = <ArrowIcon direction="left" />,
  nextButton = <ArrowIcon direction="right" />,
  onPrevClick,
  onNextClick,
}: {
  prevButton?: ReactElement
  nextButton?: ReactElement
  onPrevClick?: () => void
  onNextClick?: () => void
}) {
  const { flickingRef } = useFlickingCarousel()

  const handlePrevClick = () => {
    flickingRef.current?.prev()

    onPrevClick && onPrevClick()
  }

  const handleNextClick = () => {
    flickingRef.current?.next()

    onNextClick && onNextClick()
  }

  const prevButtonElement = (
    <FlickingScrollButton direction="left" onClick={handlePrevClick}>
      {prevButton}
    </FlickingScrollButton>
  )

  const nextButtonElement = (
    <FlickingScrollButton direction="right" onClick={handleNextClick}>
      {nextButton}
    </FlickingScrollButton>
  )

  return (
    <>
      {prevButtonElement}

      {nextButtonElement}
    </>
  )
}
