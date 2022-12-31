import { ComponentType } from 'react'
import { Container, Text } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { EFFECTES, EffectData } from '../effects'

export interface TextFrame {
  type: 'text'
  value: {
    text: string
  }
  canvasX: number
  width: number
  height: number
  effect?: Omit<EffectData, 'children'>
}

const TextContainer = styled(Container)<{
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
      padding: ${(height / canvasX) * 100}% 0 0 0;
      position: relative;
    `}

  ${({ canvasX, width }) =>
    canvasX &&
    width &&
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
    ? (EFFECTES[effect.type] as ComponentType<Omit<EffectData, 'type'>>)
    : EFFECTES.none

  return (
    <TextContainer width={width} height={height} canvasX={canvasX}>
      <EffectElement options={effect?.options}>
        <Text>{text}</Text>
      </EffectElement>
    </TextContainer>
  )
}
