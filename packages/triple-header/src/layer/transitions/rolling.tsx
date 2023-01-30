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
  display: flex;
  width: 100%;
  height: 100%;

  ${({ isTransition }) =>
    isTransition &&
    css`
      transition: ease all 0.3s;
    `}
`

export function Rolling({ children }: { children: ReactNode[] }) {
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)
  const [hasTransition, setHasTransition] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const newFrameNodes = useMemo(() => [...children, children[0]], [children])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleFrameIndex((prevVisibleFrameIndex) => {
        return prevVisibleFrameIndex === newFrameNodes.length - 1
          ? 0
          : prevVisibleFrameIndex + 1
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [newFrameNodes, visibleFrameIndex])

  useEffect(() => {
    if (visibleFrameIndex === newFrameNodes.length - 1) {
      setTimeout(() => {
        setHasTransition(false)
        setVisibleFrameIndex(0)
      }, 300)
    } else if (visibleFrameIndex < newFrameNodes.length - 1) {
      setHasTransition(true)
    }
  }, [newFrameNodes, visibleFrameIndex])

  const calculateNewX = useCallback(
    () => -visibleFrameIndex * (containerRef.current?.clientWidth || 0),
    [visibleFrameIndex],
  )

  return (
    <RollingContainer
      isTransition={hasTransition}
      ref={containerRef}
      style={{ left: calculateNewX() }}
    >
      {newFrameNodes.map((slide, index) => {
        return <Fragment key={index}>{slide}</Fragment>
      })}
    </RollingContainer>
  )
}
