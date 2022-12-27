import { ComponentType } from 'react'
import { Container, MarginPadding } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { TRANSITIONS } from './transitions'
import { FRAMES } from './frames'
import { FrameData, TripleHeader as TripleHeaderProps } from './types'

const Canvas = styled(Container).attrs({
  position: 'relative',
  centered: true,
})<{ width: number; height: number }>`
  overflow: hidden;
  max-width: 768px;

  ${({ width, height }) =>
    width &&
    height &&
    css`
      width: 100%;
      height: calc(100vw * ${height / width});
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

  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `}

  ${({ positioning }) =>
    positioning
      ? css`
          bottom: ${positioning.bottom}%;
        `
      : css`
          top: 0;
        `}
`

export default function TripleHeader({
  children,
}: {
  children: TripleHeaderProps
}) {
  const { canvas, layers } = children

  return canvas && layers ? (
    <Canvas width={canvas.width} height={canvas.height}>
      {layers.map(({ frames, transition, positioning }, index) => {
        const LayerElement = transition
          ? TRANSITIONS[transition.type]
          : Container

        const pos = (Number(positioning?.bottom || 0) / canvas.height) * 100

        return (
          <Layer
            key={index}
            zIndex={index + 1}
            positioning={{ top: 0, bottom: pos }}
          >
            <LayerElement>
              {frames.map(({ type, value, ...layout }, index) => {
                const FrameElement = FRAMES[type] as ComponentType<
                  Omit<FrameData, 'type'>
                >

                return (
                  <FrameElement
                    key={index}
                    value={value}
                    {...layout}
                    canvasX={canvas.width}
                  />
                )
              })}
            </LayerElement>
          </Layer>
        )
      })}
    </Canvas>
  ) : null
}
