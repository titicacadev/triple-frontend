import { useState, ComponentType, useCallback } from 'react'
import { Container, MarginPadding } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { TRANSITIONS } from './transitions'
import { FRAMES } from './frames'
import { FrameData, TripleHeader as TripleHeaderProps } from './types'

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

const Layer = styled(Container).attrs({
  position: 'absolute',
})<{
  zIndex: number
  positioning: MarginPadding
}>`
  width: 100%;
  overflow: hidden;

  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `}

  ${({ positioning }) =>
    positioning.top &&
    css`
      top: ${positioning.top}%;
    `}

  ${({ positioning }) =>
    positioning.left &&
    css`
      left: ${positioning.left}%;
    `}
`

const FrameContainer = styled(Container)<{
  widthRatio: number
  heightRatio: number
}>`
  width: 100%;
  height: 0;
  margin: 0 auto;

  ${({ heightRatio }) =>
    heightRatio &&
    css`
      padding: ${heightRatio}% 0 0 0;
      position: relative;
    `}

  ${({ widthRatio }) =>
    widthRatio &&
    css`
      max-width: ${widthRatio}%;
    `}
`

export default function TripleHeader({
  children,
}: {
  children: TripleHeaderProps
}) {
  const [clientWidth, setClientWidth] = useState<number | undefined>(undefined)

  const previewRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setClientWidth(node.children[0].clientWidth)
    }
  }, [])

  const { canvas, layers } = children

  return canvas && layers ? (
    <Canvas
      ref={previewRef}
      clientWidth={clientWidth}
      width={canvas.width}
      height={canvas.height}
    >
      {layers.map(({ frames, transition, positioning }, index) => {
        const LayerElement = transition
          ? TRANSITIONS[transition.type]
          : Container

        const position = {
          top: (Number(positioning?.top || 0) / canvas.height) * 100,
          left: (Number(positioning?.left || 0) / canvas.height) * 100,
        }

        return (
          <Layer
            key={index}
            zIndex={index + 1}
            positioning={{ top: position.top, left: position.left }}
          >
            <LayerElement>
              {frames.map(({ type, width, height, value, effect }, index) => {
                const FrameElement = FRAMES[type] as ComponentType<
                  Omit<FrameData, 'type'>
                >

                const widthRatio = width ? (width / canvas.width) * 100 : 0
                const heightRatio = height ? (height / canvas.width) * 100 : 0

                return (
                  <FrameContainer
                    key={index}
                    widthRatio={widthRatio}
                    heightRatio={heightRatio}
                  >
                    <FrameElement value={value} effect={effect} />
                  </FrameContainer>
                )
              })}
            </LayerElement>
          </Layer>
        )
      })}
    </Canvas>
  ) : null
}
