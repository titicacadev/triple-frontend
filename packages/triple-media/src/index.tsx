import React from 'react'
import {
  Video,
  ImageSourceType,
  Image,
  MarginPadding,
} from '@titicaca/core-elements'
import { ImageMeta, FrameRatioAndSizes } from '@titicaca/type-definitions'
import { Quality, Version } from '@titicaca/content-utilities'

export type MediaMeta = ImageMeta

export default function Media({
  optimized = false,
  placeholderSrc,
  mediaUrlBase,
  version,
  quality,
  format,
  loading,
  deviceSizes,
  media,
  autoPlay,
  hideControls,
  showNativeControls,
  ImageSource,
  borderRadius,
  margin,
  frame,
  onClick,
}: {
  optimized?: boolean
  placeholderSrc?: string
  mediaUrlBase?: string
  version?: Version
  quality?: Quality
  format?: string
  loading?: 'lazy' | 'eager'
  deviceSizes?: number[]
  media: ImageMeta
  autoPlay?: boolean
  hideControls?: boolean
  showNativeControls?: boolean
  ImageSource?: ImageSourceType
  borderRadius?: number
  margin?: MarginPadding
  frame?: FrameRatioAndSizes
  onClick?: (e: React.SyntheticEvent, media: ImageMeta) => void
}) {
  const {
    type,
    sizes,
    cloudinaryBucket,
    cloudinaryId,
    video,
    frame: mediaFrame,
    sourceUrl,
  } = media

  if (type && type === 'video' && video) {
    return (
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
    )
  }

  return (
    <Image borderRadius={borderRadius}>
      <Image.FixedRatioFrame
        margin={margin}
        frame={mediaFrame || frame}
        onClick={onClick && ((e: React.SyntheticEvent) => onClick(e, media))}
      >
        {media && optimized ? (
          <Image.OptimizedImg
            placeholderSrc={placeholderSrc}
            mediaUrlBase={mediaUrlBase}
            cloudinaryId={cloudinaryId as string}
            cloudinaryBucket={cloudinaryBucket}
            version={version}
            quality={quality}
            format={format}
            loading={loading}
            deviceSizes={deviceSizes}
          />
        ) : (
          <Image.Img src={sizes.large.url} />
        )}

        {sourceUrl ? (
          <Image.SourceUrl>
            {ImageSource ? <ImageSource sourceUrl={sourceUrl} /> : sourceUrl}
          </Image.SourceUrl>
        ) : null}
      </Image.FixedRatioFrame>
    </Image>
  )
}
