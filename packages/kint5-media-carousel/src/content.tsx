import { MouseEventHandler } from 'react'
import { Image, Ratio } from '@titicaca/kint5-core-elements'

import { MediumMeta } from './types'

interface Props {
  medium: MediumMeta
  frame?: Ratio
  onClick?: MouseEventHandler
}

export function Content({ medium, frame, onClick }: Props) {
  return (
    <Image borderRadius={0}>
      <Image.FixedRatioFrame
        frame={frame}
        onClick={onClick}
        css={{ backgroundColor: 'var(--color-kint5-gray0)' }}
      >
        {medium.type === 'video' ? (
          <video
            src={medium.video?.large.url}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Image.Img
            src={medium.sizes.large.url}
            alt={medium.title || medium.description || ''}
          />
        )}
      </Image.FixedRatioFrame>
    </Image>
  )
}
