import { useState, useCallback, useLayoutEffect } from 'react'
import { Container } from '@titicaca/tds-ui'
import styled, { css } from 'styled-components'

import { Layer } from './layer'
import { TripleHeaderProps } from './types'
import { Lottie } from './lottie'

const MAX_WIDTH = 768

const Canvas = styled(Container).attrs({
  position: 'relative',
  centered: true,
})<{
  clientWidth?: number
  isImageMotionType: boolean
  width: number
  height: number
}>`
  overflow: hidden;
  max-width: ${MAX_WIDTH}px;

  ${({ isImageMotionType, clientWidth, width, height }) =>
    width &&
    height &&
    css`
      width: 100%;
      height: ${isImageMotionType
        ? `calc(${clientWidth || MAX_WIDTH}px * ${height / width})`
        : height};
      max-height: ${isImageMotionType
        ? `${MAX_WIDTH * (height / width)}px`
        : 'none'};
    `}
`

export function TripleHeader({ children }: { children: TripleHeaderProps }) {
  const [clientWidth, setClientWidth] = useState<number | undefined>(undefined)
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  const previewRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setNode(node)
      setClientWidth(node.children[0].clientWidth)
    }
  }, [])

  useLayoutEffect(() => {
    if (node) {
      const getClientWidth = () => {
        setClientWidth(node.children[0].clientWidth)
      }

      window.addEventListener('resize', getClientWidth)

      return () => {
        window.removeEventListener('resize', getClientWidth)
      }
    }
  }, [node])

  const { type = 'IMAGE', canvas, layers, lottieJson } = children

  const calculateFrameRatio = (length?: number) => {
    return length ? (length / canvas.width) * 100 : 0
  }

  const isImageMotionType = type === 'IMAGE'

  return canvas && layers ? (
    <Canvas
      ref={previewRef}
      isImageMotionType={isImageMotionType}
      clientWidth={clientWidth}
      width={canvas.width}
      height={canvas.height}
    >
      {isImageMotionType ? (
        layers.map(({ frames, transition, positioning }, index) => {
          const position = {
            top: (Number(positioning?.top || 0) / canvas.height) * 100,
            left: (Number(positioning?.left || 0) / canvas.height) * 100,
          }

          return (
            <Layer
              key={index}
              zIndex={index + 1}
              position={position}
              frames={frames}
              transition={transition}
              calculateFrameRatio={calculateFrameRatio}
            />
          )
        })
      ) : (
        <Lottie
          animationData={lottieJson}
          width={canvas.width}
          height={canvas.height}
        />
      )}
    </Canvas>
  ) : null
}
