import { SyntheticEvent } from 'react'
import { Responsive } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

import { ImageElement, SquareFrame } from './elements'

export default function SingleImage({
  image,
  onImageClick,
}: {
  image: ImageMeta
  onImageClick?: (e: SyntheticEvent, index: number) => void
}) {
  return (
    <>
      <Responsive maxWidth={499}>
        {image.width && image.height && image.width > image.height ? (
          <ImageElement
            src={image.sizes.large.url}
            onClick={(e) => onImageClick && onImageClick(e, 0)}
          />
        ) : (
          <SquareFrame>
            <ImageElement
              src={image.sizes.large.url}
              absolute
              fullHeight
              onClick={(e) => onImageClick && onImageClick(e, 0)}
            />
          </SquareFrame>
        )}
      </Responsive>
      <Responsive minWidth={500}>
        <ImageElement
          src={image.sizes.large.url}
          height={293}
          onClick={(e) => onImageClick && onImageClick(e, 0)}
        />
      </Responsive>
    </>
  )
}
