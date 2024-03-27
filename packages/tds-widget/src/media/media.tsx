import { SyntheticEvent } from 'react'
import {
  Video,
  Image,
  MarginPadding,
  OptimizedImgProps,
} from '@titicaca/tds-ui'
import { ImageMeta, FrameRatioAndSizes } from '@titicaca/type-definitions'

import { ImageSource } from '../image-source'

export type MediaMeta = ImageMeta

export type MediaProps = {
  optimized?: boolean
  media: ImageMeta
  autoPlay?: boolean
  loop?: boolean
  hideControls?: boolean
  showNativeControls?: boolean
  ImageSource?: typeof ImageSource
  borderRadius?: number
  margin?: MarginPadding
  frame?: FrameRatioAndSizes
  onClick?: (e: SyntheticEvent, media: ImageMeta) => void
} & Omit<OptimizedImgProps, 'cloudinaryBucket' | 'cloudinaryId'>

export function Media({
  optimized = false,
  media,
  autoPlay,
  loop = true,
  hideControls,
  showNativeControls,
  ImageSource,
  borderRadius,
  margin,
  frame,
  onClick,
  ...props
}: MediaProps) {
  const {
    id,
    type,
    sizes,
    cloudinaryBucket,
    cloudinaryId,
    video,
    frame: mediaFrame,
    sourceUrl,
    title,
    description,
  } = media

  if (type && type === 'video' && video) {
    return (
      <Video
        borderRadius={borderRadius}
        frame={mediaFrame || frame || 'large'}
        fallbackImageUrl={sizes.large.url}
        src={video.large.url}
        cloudinaryBucket={cloudinaryBucket}
        cloudinaryId={cloudinaryId}
        autoPlay={autoPlay}
        loop={loop}
        hideControls={!!hideControls}
        showNativeControls={showNativeControls}
      />
    )
  }

  return (
    <Image borderRadius={borderRadius}>
      <Image.FixedRatioFrame
        margin={margin}
        frame={mediaFrame || frame}
        onClick={onClick && ((e: SyntheticEvent) => onClick(e, media))}
      >
        {sourceUrl ? (
          <Image.SourceUrl>
            {ImageSource ? <ImageSource sourceUrl={sourceUrl} /> : sourceUrl}
          </Image.SourceUrl>
        ) : null}

        {media && optimized ? (
          <Image.OptimizedImg
            cloudinaryId={cloudinaryId || id}
            cloudinaryBucket={cloudinaryBucket}
            alt={title || description || undefined}
            {...props}
          />
        ) : (
          <Image.Img
            src={sizes.large.url}
            alt={title || description || undefined}
            css={{ display: 'block' }}
          />
        )}
      </Image.FixedRatioFrame>
    </Image>
  )
}
