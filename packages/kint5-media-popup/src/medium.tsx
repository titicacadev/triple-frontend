import styled, { css } from 'styled-components'
import { Image } from '@titicaca/kint5-core-elements'
import { FrameRatioAndSizes } from '@titicaca/type-definitions'

import { MediumMeta } from './types'

const Video = styled.video<{ $frame: FrameRatioAndSizes }>`
  width: 100%;
  height: 100%;
  border-radius: 0;
  object-fit: cover;
  opacity: 100%;

  ${({ $frame }) =>
    $frame !== 'original' &&
    css`
      position: absolute;
      top: 0;
      z-index: 0;
    `};
`

export function Medium({
  medium,
  frame,
  videoAutoPlay,
}: {
  medium: MediumMeta
  frame: FrameRatioAndSizes
  videoAutoPlay?: boolean
}) {
  if (medium.type === 'video') {
    return (
      <Video
        src={medium.video?.large.url}
        autoPlay={videoAutoPlay}
        loop
        muted
        playsInline
        controls={!videoAutoPlay}
        $frame={frame}
      />
    )
  }

  return (
    <Image.Img
      src={medium.sizes.large.url}
      alt={medium.title || medium.description || ''}
      draggable={false}
    />
  )
}
