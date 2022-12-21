import { ComponentType } from 'react'
import { Container, Text } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { IMAGE_EFFECTS, EffectData } from '../effects'

export interface TextFrame {
  type: 'text'
  value: {
    text: string
  }
  width: number
  height: number
  effect?: {
    type: 'none' | 'fadeInOut'
    options?: {
      infinity?: boolean
      repeatType?: 'loop' | 'reverse' | 'mirror'
    }
  }
  canvasX: number
}

const ImageContainer = styled(Container)<{
  canvasX: number
  width: number
  height: number
}>`
  width: 100%;
  height: 0;
  margin: 0 auto;

  ${({ canvasX, height }) =>
    canvasX &&
    height &&
    css`
      padding: ${(height / canvasX) * 100}% 0 0 0; // height
      position: relative;
    `}

  ${({ width, canvasX }) =>
    width &&
    canvasX &&
    css`
      max-width: ${(width / canvasX) * 100}%;
    `}
`

export default function TextFrame({
  value: { text },
  width,
  height,
  effect,
  canvasX,
}: Omit<TextFrame, 'type'>) {
  const EffectElement = effect
    ? (IMAGE_EFFECTS[effect.type] as ComponentType<Omit<EffectData, 'type'>>)
    : IMAGE_EFFECTS.none

  return (
    <ImageContainer width={width} height={height} canvasX={canvasX}>
      <EffectElement options={effect?.options}>
        <Text>{text}</Text>
      </EffectElement>
    </ImageContainer>
  )
}
