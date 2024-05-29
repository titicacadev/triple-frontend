import { useState, useCallback, useLayoutEffect, useEffect } from 'react'
import { Container } from '@titicaca/tds-ui'
import styled, { css } from 'styled-components'

import { Layer } from './layer'
import { TripleHeaderProps } from './types'
import { Lottie } from './lottie'
import { getStorage } from './service'

const MAX_WIDTH = 768

const Canvas = styled(Container).attrs({
  position: 'relative',
  centered: true,
})<{
  clientWidth?: number
  width: number
  height: number
}>`
  overflow: hidden;
  max-width: ${MAX_WIDTH}px;

  ${({ clientWidth, width, height }) =>
    width &&
    height &&
    css`
      width: 100%;
      height: calc(${clientWidth || MAX_WIDTH}px * ${height / width});
      max-height: ${MAX_WIDTH * (height / width)}px;
    `}
`

export function TripleHeader({ children }: { children: TripleHeaderProps }) {
  const [clientWidth, setClientWidth] = useState<number | undefined>(undefined)
  const [node, setNode] = useState<HTMLDivElement | null>(null)
  const [lottieData, setLottieData] = useState<unknown>()

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

  const { type = 'LAYER', canvas, layers, lottieAnimationId } = children

  const calculateFrameRatio = (length?: number) => {
    return canvas && length ? (length / canvas.width) * 100 : 0
  }

  const isImageMotionType = type === 'LAYER'

  useEffect(() => {
    async function fetchAndeSetStorage() {
      const response = await getStorage({
        id: lottieAnimationId,
      })
      setLottieData(response)
    }

    !isImageMotionType && fetchAndeSetStorage()
  }, [isImageMotionType, lottieAnimationId])

  return isImageMotionType && canvas && layers ? (
    <Canvas
      ref={previewRef}
      clientWidth={clientWidth}
      width={canvas.width}
      height={canvas.height}
    >
      {layers.map(({ frames, transition, positioning }, index) => {
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
      })}
    </Canvas>
  ) : (
    <Lottie lottieData={lottieData} />
  )
}
