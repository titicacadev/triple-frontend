import {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Fragment,
} from 'react'
import { Container } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

const RollingContainer = styled(Container)<{ isTransition: boolean }>`
  position: relative;
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  width: 100%;
  height: 100%;

  ${({ isTransition }) =>
    isTransition &&
    css`
      transition: ease all 0.3s;
    `}
`

export default function Rolling({ children }: { children: ReactNode[] }) {
  const [visibleSlide, setVisibleSlide] = useState(1)
  const [slides, setSlide] = useState(children)
  const [hasTransition, setHasTransition] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slidesWithClones = [...children]
    slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1])
    slidesWithClones.push(slidesWithClones[1])

    setSlide(slidesWithClones)
  }, [children])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSlide((prevVisibleSlide) => {
        return prevVisibleSlide === slides.length - 1 ? 0 : prevVisibleSlide + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [slides, visibleSlide])

  useEffect(() => {
    if (visibleSlide === slides.length - 1) {
      setTimeout(() => {
        setHasTransition(false)
        setVisibleSlide(1)
      }, 500)
    } else if (visibleSlide < slides.length - 1) {
      setHasTransition(true)
    }
  }, [slides, visibleSlide])

  const calculateNewX = useCallback(
    () => -visibleSlide * (containerRef.current?.clientWidth || 0),
    [visibleSlide],
  )

  return (
    <RollingContainer
      isTransition={hasTransition}
      ref={containerRef}
      style={{ left: calculateNewX() }}
    >
      {slides.map((slide, index) => {
        return <Fragment key={index}>{slide}</Fragment>
      })}
    </RollingContainer>
  )
}
