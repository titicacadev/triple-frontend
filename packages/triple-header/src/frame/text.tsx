import { Text } from '@titicaca/core-elements'

import { MotionContainer } from '../motion-container'

import { EFFECTES, Effect } from './effects'

export type TextFrame = { type: 'text' } & TextFrameProps
interface TextFrameProps {
  value: {
    text: string
  }
  width?: number
  height?: number
  effect?: Effect
}

export default function TextFrame({ value: { text }, effect }: TextFrameProps) {
  const EffectElement = effect ? EFFECTES[effect.type] : MotionContainer

  return (
    <EffectElement options={effect?.options}>
      <Text>{text}</Text>
    </EffectElement>
  )
}
