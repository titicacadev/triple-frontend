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
  index: number
  totalFramesCount: number
  onLinkClick?: LinkEventHandler
}

export function TextFrame({
  value: { text },
  effect,
  index,
  totalFramesCount,
  onLinkClick,
}: TextFrameProps) {
  const EffectElement = effect ? EFFECTS[effect.type] : MotionContainer

  return (
    <EffectElement options={{ ...effect?.options, index, totalFramesCount }}>
      <Text
        onClick={(e) => generateLinkClickHandler(onLinkClick)(e, text.link)}
      >
        {text.content}
      </Text>
    </EffectElement>
  )
}
