import { Container, MarginPadding } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { FrameData, TransitionType } from '../types'
import Frame from '../frame'

import { TRANSITIONS } from './transitions'

const LayerContainer = styled(Container).attrs({
  position: 'absolute',
})<{
  zIndex: number
}>`
  width: 100%;

  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `}
`

export default function Layer({
  zIndex,
  position,
  frames,
  transition,
  calculateFrameRatio,
}: {
  zIndex: number
  position: MarginPadding
  frames: FrameData[]
  transition?: { type: TransitionType }
  calculateFrameRatio: (length?: number) => number
}) {
  const TransitionElement = transition
    ? TRANSITIONS[transition.type]
    : Container

  return (
    <LayerContainer
      zIndex={zIndex}
      css={{ top: `${position.top}%`, left: `${position.left}%` }}
    >
      <TransitionElement>
        {frames.map((frame, index) => {
          return (
            <Frame
              key={index}
              frame={frame}
              calculateFrameRatio={calculateFrameRatio}
            />
          )
        })}
      </TransitionElement>
    </LayerContainer>
  )
}
