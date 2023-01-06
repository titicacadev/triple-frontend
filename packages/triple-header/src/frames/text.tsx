import { ComponentType } from 'react'
import { Text } from '@titicaca/core-elements'

import { EFFECTES, EffectData } from '../effects'

export interface TextFrame {
  type: 'text'
  value: {
    text: string
  }
  width?: number
  height?: number
  effect?: EffectData
}

export default function TextFrame({
  value: { text },
  effect,
}: Omit<TextFrame, 'type'>) {
  const EffectElement = effect
    ? (EFFECTES[effect.type] as ComponentType<Omit<EffectData, 'type'>>)
    : EFFECTES.none

  return (
    <EffectElement options={effect?.options}>
      <Text>{text}</Text>
    </EffectElement>
  )
}
