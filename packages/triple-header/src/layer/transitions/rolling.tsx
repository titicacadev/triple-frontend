import {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Fragment,
  useMemo,
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
  const [visibleSlide, setVisibleSlide] = useState(0)
  const [hasTransition, setHasTransition] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const newChildrenNodes = useMemo(() => [...children, children[0]], [children])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSlide((prevVisibleSlide) => {
        return prevVisibleSlide === newChildrenNodes.length - 1
          ? 0
          : prevVisibleSlide + 1
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [newChildrenNodes, visibleSlide])

  useEffect(() => {
    if (visibleSlide === newChildrenNodes.length - 1) {
      setTimeout(() => {
        setHasTransition(false)
        setVisibleSlide(0)
      }, 300)
    } else if (visibleSlide < newChildrenNodes.length - 1) {
      setHasTransition(true)
    }
  }, [newChildrenNodes, visibleSlide])

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
      {newChildrenNodes.map((slide, index) => {
        return <Fragment key={index}>{slide}</Fragment>
      })}
    </RollingContainer>
  )
}
