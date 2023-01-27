import { useState, useCallback, useLayoutEffect } from 'react'
import { Container } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { Layer } from './layer'
import { TripleHeader as TripleHeaderProps } from './types'

const Canvas = styled(Container).attrs({
  position: 'relative',
  centered: true,
})<{ clientWidth?: number; width: number; height: number }>`
  overflow: hidden;
  max-width: 768px;

  ${({ clientWidth, width, height }) =>
    width &&
    height &&
    css`
      width: 100%;
      height: calc(${clientWidth}px * ${height / width});
      max-height: ${768 * (height / width)}px;
    `}
`

export default function TripleHeader({
  children,
}: {
  children: TripleHeaderProps
}) {
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

  const { canvas, layers } = children

  const calculateFrameRatio = (length?: number) => {
    return length ? (length / canvas.width) * 100 : 0
  }

  return canvas && layers ? (
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
  ) : null
}
