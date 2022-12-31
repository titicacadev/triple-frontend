import { ComponentType } from 'react'
import { Container } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'
import styled, { css } from 'styled-components'

import { EFFECTES, EffectData } from '../effects'

export interface ImageFrame {
  type: 'image'
  value: {
    image: ImageMeta
  }
  canvasX: number
  width: number
  height: number
  effect?: Omit<EffectData, 'children'>
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
      padding: ${(height / canvasX) * 100}% 0 0 0;
      position: relative;
    `}

  ${({ width, canvasX }) =>
    width &&
    canvasX &&
    css`
      max-width: ${(width / canvasX) * 100}%;
    `}
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default function ImageFrame({
  value: { image },
  canvasX,
  width,
  height,
  effect,
}: Omit<ImageFrame, 'type'>) {
  const EffectElement = effect
    ? (EFFECTES[effect.type] as ComponentType<Omit<EffectData, 'type'>>)
    : EFFECTES.none

  return (
    <ImageContainer width={width} height={height} canvasX={canvasX}>
      <EffectElement options={effect?.options}>
        <Image src={image.sizes.full.url} />
      </EffectElement>
    </ImageContainer>
  )
}
