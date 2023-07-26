import { ImageMeta } from '@titicaca/type-definitions'
import styled from 'styled-components'

import { MotionContainer } from '../motion-container'
import { LinkEventHandler } from '../types'

import { EFFECTS, Effect } from './effects'
import { generateLinkClickHandler } from './common'

export type ImageFrame = { type: 'image' } & Omit<
  ImageFrameProps,
  'index' | 'totalFramesCount'
>

interface ImageFrameProps {
  value: {
    image: ImageMeta
  }
  width?: number
  height?: number
  effect?: Effect
  index: number
  totalFramesCount: number
  onLinkClick?: LinkEventHandler
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export function ImageFrame({
  value: { image },
  effect,
  index,
  totalFramesCount,
  onLinkClick,
}: ImageFrameProps) {
  const EffectElement = effect ? EFFECTS[effect.type] : MotionContainer

  return Object.keys(image).length > 0 ? (
    <EffectElement
      options={effect?.options}
      index={index}
      totalFramesCount={totalFramesCount}
    >
      <Image
        src={image.sizes.full.url}
        onClick={(e) => generateLinkClickHandler(onLinkClick)(e, image.link)}
        width="100%"
        height="100%"
      />
    </EffectElement>
  ) : null
}
