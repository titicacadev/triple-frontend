/* eslint-disable @typescript-eslint/no-explicit-any */

import { Container } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { TRANSITIONS } from './transitions'
import { FRAMES } from './frames'

const Canvas = styled(Container).attrs({
  position: 'relative',
  centered: true,
  maxWidth: 768,
})`
  width: 100%;
  height: 0;
  padding: 100% 0 0 0;
  overflow: hidden;
`

const Layer = styled(Container).attrs({
  position: 'absolute',
})<{ zIndex: number }>`
  top: 0;
  width: 100%;
  padding: 0;

  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `}
`

export default function TripleHeader({
  children,
  onFrameClick,
}: {
  children: {
    canvas: {
      width: number
      height: number
    }
    layers: {
      id: number
      frames: {
        type: 'image' | 'text'
        value: any
      }[]
      transition: {
        type: 'slide' | 'rolling' | 'marquee'
      }
    }[]
  }
  onFrameClick?: () => void
}) {
  const { layers } = children || {}

  return (
    <Canvas>
      {layers.map(({ id, frames, transition }) => {
        // TODO : Transition이 undefined일 때 코드 구현
        const LayerElement = transition
          ? TRANSITIONS[transition.type]
          : Container

        return (
          <Layer key={id} zIndex={id}>
            <LayerElement>
              {frames.map(({ type, value, ...layout }, index) => {
                const FrameElement = FRAMES[type]

                return (
                  <FrameElement
                    key={index}
                    value={value}
                    {...layout}
                    onFrameClick={onFrameClick}
                  />
                )
              })}
            </LayerElement>
          </Layer>
        )
      })}
    </Canvas>
  )
}
