import styled from 'styled-components'
import { Image } from '@titicaca/kint5-core-elements'

import { MediumMeta } from './types'

const Video = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 0;
  object-fit: cover;
  opacity: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
`

export function Medium({ medium }: { medium: MediumMeta }) {
  if (medium.type === 'video') {
    return (
      <Video
        src={medium.video?.large.url}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
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
