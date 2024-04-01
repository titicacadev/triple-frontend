import { Text } from '@titicaca/tds-ui'

import { MotionContainer } from '../motion-container'
import { Link, LinkEventHandler } from '../types'

import { generateLinkClickHandler } from './common'
import { EFFECTS, Effect } from './effects'

export type TextFrame = { type: 'text' } & Omit<
  TextFrameProps,
  'index' | 'frameCount'
>

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
  frameCount: number
  onLinkClick?: LinkEventHandler
}

export function TextFrame({
  value: { text },
  effect,
  index,
  frameCount,
  onLinkClick,
}: TextFrameProps) {
  const EffectElement = effect ? EFFECTS[effect.type] : MotionContainer

  return (
    <EffectElement
      options={effect?.options}
      index={index}
      frameCount={frameCount}
    >
      <Text
        onClick={(e) => generateLinkClickHandler(onLinkClick)(e, text.link)}
      >
        {text.content}
      </Text>
    </EffectElement>
  )
}
