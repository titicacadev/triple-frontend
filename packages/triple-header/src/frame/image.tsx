import { ImageMeta } from '@titicaca/type-definitions'
import styled from 'styled-components'

import { MotionContainer } from '../motion-container'

import { EFFECTES, Effect } from './effects'

export type ImageFrame = { type: 'image' } & ImageFrameProps

interface ImageFrameProps {
  value: {
    image: ImageMeta
  }
  width?: number
  height?: number
  effect?: Effect
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default function ImageFrame({
  value: { image },
  effect,
}: ImageFrameProps) {
  const EffectElement = effect ? EFFECTES[effect.type] : MotionContainer

  return Object.keys(image).length > 0 ? (
    <EffectElement options={effect?.options}>
      <Image src={image.sizes.full.url} />
    </EffectElement>
  ) : null
}
