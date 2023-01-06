import { ComponentType } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import styled from 'styled-components'

import { EFFECTES, EffectData } from '../effects'

export interface ImageFrame {
  type: 'image'
  value: {
    image: ImageMeta
  }
  width?: number
  height?: number
  effect?: EffectData
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default function ImageFrame({
  value: { image },
  effect,
}: Omit<ImageFrame, 'type'>) {
  const EffectElement = effect
    ? (EFFECTES[effect.type] as ComponentType<Omit<EffectData, 'type'>>)
    : EFFECTES.none

  return Object.keys(image).length > 0 ? (
    <EffectElement options={effect?.options}>
      <Image src={image.sizes.full.url} />
    </EffectElement>
  ) : null
}
