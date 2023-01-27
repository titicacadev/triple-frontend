import { Text } from '@titicaca/core-elements'

import { MotionContainer } from '../motion-container'
import { Link, LinkEventHandler } from '../types'

import { generateLinkClickHandler } from './common'
import { EFFECTS, Effect } from './effects'

export type TextFrame = { type: 'text' } & TextFrameProps
interface TextFrameProps {
  value: {
    text: {
      content: string
      link?: Link
    }
  }
  width?: number
  height?: number
  effect?: Effect
  onLinkClick?: LinkEventHandler
}

export function TextFrame({
  value: { text },
  effect,
  onLinkClick,
}: TextFrameProps) {
  const EffectElement = effect ? EFFECTS[effect.type] : MotionContainer

  return (
    <EffectElement options={effect?.options}>
      <Text
        onClick={(e) => generateLinkClickHandler(onLinkClick)(e, text.link)}
      >
        {text.content}
      </Text>
    </EffectElement>
  )
}
