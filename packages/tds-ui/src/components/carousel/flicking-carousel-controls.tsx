import { ReactElement } from 'react'
import styled, { css } from 'styled-components'

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
  ${({ direction, containerPadding }) => css`
    ${direction}: ${(containerPadding?.[direction] || 0) - 30}px;
  `}
  z-index: 60;
  outline: none;
`

export function FlickingCarouselControls({
  prevButton: customPrevButton,
  nextButton: customNextButton,
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

  const prevButtonElement = customPrevButton ?? (
    <FlickingScrollButton
      //   containerPadding={containerPadding}
      direction="left"
      onClick={handlePrevClick}
    >
      <ArrowIcon direction="left" />
    </FlickingScrollButton>
  )

  const nextButtonElement = customNextButton ?? (
    <FlickingScrollButton
      //   containerPadding={containerPadding}
      direction="right"
      onClick={handleNextClick}
    >
      <ArrowIcon direction="right" />
    </FlickingScrollButton>
  )

  return (
    <>
      {prevButtonElement}

      {nextButtonElement}
    </>
  )
}
