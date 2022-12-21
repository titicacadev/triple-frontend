import { ComponentType, Fragment } from 'react'
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

  return (
    <Canvas width={canvas.width} height={canvas.height}>
      {layers.map(({ id, frames, transition, positioning }) => {
        const LayerElement = transition
          ? TRANSITIONS[transition.type]
          : Container

        const pos = (Number(positioning?.bottom || 0) / canvas.height) * 100

        return (
          <Layer key={id} zIndex={id} positioning={{ top: 0, bottom: pos }}>
            <LayerElement>
              {frames.map(({ type, value, ...layout }, index) => {
                const FrameElement = FRAMES[type] as ComponentType<
                  Omit<FrameData, 'type'>
                >

                return (
                  <Fragment key={index}>
                    <FrameElement
                      value={value}
                      {...layout}
                      canvasX={canvas.width}
                    />
                  </Fragment>
                )
              })}
            </LayerElement>
          </Layer>
        )
      })}
    </Canvas>
  )
}
