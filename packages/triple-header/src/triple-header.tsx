import { useState, useEffect, useRef, ComponentType, Fragment } from 'react'
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

export default function TripleHeader({
  children,
}: {
  children: TripleHeaderProps
}) {
  const [clientWidth, setClientWidth] = useState<number | undefined>(undefined)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewRef.current) {
      setClientWidth(previewRef.current.children[0].clientWidth)
    }
  }, [])

  useEffect(() => {
    addEventListener('resize', () => {
      if (previewRef.current) {
        setClientWidth(previewRef.current.clientWidth)
      }
    })
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
  ) : null
}
