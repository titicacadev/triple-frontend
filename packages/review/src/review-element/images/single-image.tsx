import { Responsive } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

import { ImageElement, SquareFrame } from './elements'

export default function SingleImage({ image }: { image: ImageMeta }) {
  return (
    <>
      <Responsive maxWidth={499}>
        {image.width && image.height && image.width > image.height ? (
          <ImageElement src={image.sizes.large.url} />
        ) : (
          <SquareFrame>
            <ImageElement src={image.sizes.large.url} absolute fullHeight />
          </SquareFrame>
        )}
      </Responsive>
      <Responsive minWidth={500}>
        <ImageElement src={image.sizes.large.url} height={293} />
      </Responsive>
    </>
  )
}
