import React from 'react'
import {
  Video,
  ImageSourceType,
  Image,
  MarginPadding,
  OptimizedImgProps,
} from '@titicaca/core-elements'
import { ImageMeta, FrameRatioAndSizes } from '@titicaca/type-definitions'

export type MediaMeta = ImageMeta

export default function Media({
  optimized = false,
  media,
  autoPlay,
  hideControls,
  showNativeControls,
  ImageSource,
  borderRadius,
  margin,
  frame,
  onClick,
  ...props
}: {
  optimized?: boolean
  media: ImageMeta
  autoPlay?: boolean
  hideControls?: boolean
  showNativeControls?: boolean
  ImageSource?: ImageSourceType
  borderRadius?: number
  margin?: MarginPadding
  frame?: FrameRatioAndSizes
  onClick?: (e: React.SyntheticEvent, media: ImageMeta) => void
} & Omit<OptimizedImgProps, 'cloudinaryBucket' | 'cloudinaryId'>) {
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
      <Image borderRadius={borderRadius}>
        <Image.FixedRatioFrame
          margin={margin}
          frame={mediaFrame || frame}
          onClick={onClick && ((e: React.SyntheticEvent) => onClick(e, media))}
        >
          <Video
            frame={mediaFrame || frame || 'large'}
            src={video.large.url}
            fallbackImageUrl={sizes.large.url}
            cloudinaryBucket={cloudinaryBucket}
            cloudinaryId={cloudinaryId}
            autoPlay={autoPlay}
            borderRadius={borderRadius}
            hideControls={!!hideControls}
            showNativeControls={showNativeControls}
          />
        </Image.FixedRatioFrame>
      </Image>
    )
  }

  return (
    <Image borderRadius={borderRadius}>
      <Image.FixedRatioFrame
        margin={margin}
        frame={mediaFrame || frame}
        onClick={onClick && ((e: React.SyntheticEvent) => onClick(e, media))}
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
          />
        )}
      </Image.FixedRatioFrame>
    </Image>
  )
}
