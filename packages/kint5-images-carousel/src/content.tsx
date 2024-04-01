import { MouseEventHandler } from 'react'
import { Image, Ratio } from '@titicaca/kint5-core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

interface Props {
  image: ImageMeta
  frame?: Ratio
  onClick?: MouseEventHandler
}

export function Content({ image, frame, onClick }: Props) {
  return (
    <Image borderRadius={0}>
      <Image.FixedRatioFrame
        frame={frame}
        onClick={onClick}
        css={{ backgroundColor: 'var(--color-kint5-gray0)' }}
      >
        <Image.Img
          src={image.sizes.large.url}
          alt={image.title || image.description || ''}
        />
      </Image.FixedRatioFrame>
    </Image>
  )
}
