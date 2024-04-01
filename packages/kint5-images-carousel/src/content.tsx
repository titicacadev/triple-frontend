import { MouseEventHandler } from 'react'
import { Image, Ratio } from '@titicaca/kint5-core-elements'

import { CarouselImageMeta } from './types'

interface Props {
  medium: CarouselImageMeta
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
        <Image.Img src={medium.url.large} alt={medium.caption} />
      </Image.FixedRatioFrame>
    </Image>
  )
}
