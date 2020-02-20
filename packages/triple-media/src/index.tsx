import React from 'react'
import { Video, Image, GlobalSizes } from '@titicaca/core-elements'

export interface MediaMeta {
  id: string
  type: string
  sizes: {
    full: { url: string }
    large: { url: string }
    small_square: { url: string }
  }
  width?: number
  height?: number
  cloudinaryId: string
  cloudinaryBucket: string
  video?: {
    full: { url: string }
    large: { url: string }
    small_square: { url: string }
  }
  frame?: GlobalSizes
  title?: string
  link?: {
    href: string
    label?: string
  }
  sourceUrl?: string
}

export default function Media({
  ImageSource,
  onClick,
  media,
}: {
  media: MediaMeta
  ImageSource: unknown
  onClick: (e: React.SyntheticEvent, media: MediaMeta) => void
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
      />
    )
  }

  return (
    <Image
      frame={frame}
      src={sizes.large.url}
      sourceUrl={sourceUrl}
      onClick={(e: React.SyntheticEvent) => onClick(e, media)}
      ImageSource={ImageSource}
    />
  )
}
