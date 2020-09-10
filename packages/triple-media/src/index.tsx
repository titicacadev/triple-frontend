import React from 'react'
import {
  Video,
  FrameRatioAndSizes,
  ImageSourceType,
  Image,
} from '@titicaca/core-elements'

export interface MediaMeta {
  id: string
  type: string
  sizes: {
    full: { url: string }
    large: { url: string }
    small_square: { url: string } // eslint-disable-line @typescript-eslint/camelcase
  }
  width?: number
  height?: number
  cloudinaryId: string
  cloudinaryBucket: string
  video?: {
    full: { url: string }
    large: { url: string }
    small_square: { url: string } // eslint-disable-line @typescript-eslint/camelcase
  }
  frame?: FrameRatioAndSizes
  title?: string
  link?: {
    href: string
    label?: string
  }
  sourceUrl?: string
}

export default function Media({
  media,
  autoPlay,
  hideControls,
  ImageSource,
  borderRadius,
  onClick,
}: {
  media: MediaMeta
  autoPlay?: boolean
  hideControls?: boolean
  ImageSource?: ImageSourceType
  borderRadius?: number
  onClick?: (e: React.SyntheticEvent, media: MediaMeta) => void
}) {
  const {
    type,
    sizes,
    cloudinaryBucket,
    cloudinaryId,
    video,
    frame,
    sourceUrl,
  } = media

  if (type && type === 'video' && video) {
    return (
      <Video
        frame={frame || 'large'}
        src={video.large.url}
        fallbackImageUrl={sizes.large.url}
        cloudinaryBucket={cloudinaryBucket}
        cloudinaryId={cloudinaryId}
        autoPlay={autoPlay}
        borderRadius={borderRadius}
        hideControls={!!hideControls}
      />
    )
  }

  return (
    <Image borderRadius={borderRadius}>
      <Image.FixedRatioFrame
        frame={frame}
        onClick={onClick && ((e: React.SyntheticEvent) => onClick(e, media))}
      >
        <Image.Img src={sizes.large.url} />

        {sourceUrl ? (
          <Image.SourceUrl>
            {ImageSource ? (
              <ImageSource sourceUrl={sourceUrl}>{sourceUrl}</ImageSource>
            ) : (
              sourceUrl
            )}
          </Image.SourceUrl>
        ) : null}
      </Image.FixedRatioFrame>
    </Image>
  )
}
