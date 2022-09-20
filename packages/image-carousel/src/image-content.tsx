import { ImageSourceType, Image } from '@titicaca/core-elements'
import { FrameRatioAndSizes, GlobalSizes } from '@titicaca/type-definitions'
import { MouseEventHandler, ReactNode } from 'react'

import { CarouselImageMeta } from './types'

interface Props {
  medium: CarouselImageMeta
  optimized?: boolean
  height?: number
  globalSize?: GlobalSizes
  globalFrame?: FrameRatioAndSizes
  overlay?: ReactNode
  ImageSource?: ImageSourceType
  onImageClick?: MouseEventHandler
}

function ImageContent({
  medium,
  height,
  optimized,
  globalSize,
  globalFrame,
  overlay,
  ImageSource,
  onImageClick,
}: Props) {
  const {
    frame: imageFrame,
    size: imageSize,
    sizes,
    sourceUrl = '',
    title,
    description,
  } = medium
  const size = globalSize || imageSize
  const frame = size ? undefined : globalFrame || imageFrame

  const ImageFrame =
    size || height ? Image.FixedDimensionsFrame : Image.FixedRatioFrame

  return (
    <Image borderRadius={0}>
      <ImageFrame
        size={size}
        height={height}
        frame={frame}
        onClick={onImageClick}
      >
        <Image.SourceUrl>
          {ImageSource ? <ImageSource sourceUrl={sourceUrl} /> : sourceUrl}
        </Image.SourceUrl>

        {overlay ? (
          <Image.Overlay overlayType="dark" zTier={1}>
            {overlay}
          </Image.Overlay>
        ) : null}

        {optimized ? (
          <Image.OptimizedImg
            cloudinaryId={medium.cloudinaryId as string}
            cloudinaryBucket={medium.cloudinaryBucket}
            alt={title || description || undefined}
          />
        ) : (
          <Image.Img
            src={sizes.large.url}
            alt={title || description || undefined}
          />
        )}
      </ImageFrame>
    </Image>
  )
}

export default ImageContent
