import { useEffect, useState, ReactNode } from 'react'
import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'

const SlideContainer = styled(Container)<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`

export function Slide({ children }: { children: ReactNode[] }) {
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () =>
        setVisibleFrameIndex((prevVisibleFrameIndex) => {
          return prevVisibleFrameIndex === children.length - 1
            ? 0
            : prevVisibleFrameIndex + 1
        }),
      3000,
    )

    return () => clearInterval(timer)
  }, [children, visibleFrameIndex])

  return (
    <>
      {children.map((slide, index) => {
        return (
          <SlideContainer key={index} isVisible={index === visibleFrameIndex}>
            {slide}
          </SlideContainer>
        )
      })}
    </>
  )
}
