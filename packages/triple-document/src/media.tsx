import React from 'react'
import { Video, Image, GlobalSizes } from '@titicaca/core-elements'

export default function Media({
  ImageSource,
  handleClick,
  ...image
}: {
  type?: string
  frame: GlobalSizes
  sizes: any
  sourceUrl?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  video?: any
  title?: string
  ImageSource: unknown
  handleClick: (e: React.SyntheticEvent, image: any) => void
}) {
  const {
    type,
    frame,
    sizes,
    sourceUrl,
    cloudinaryBucket,
    cloudinaryId,
    video,
  } = image

  if (type && type === 'video') {
    return (
      <Video
        frame={frame}
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
      onClick={(e: React.SyntheticEvent) => handleClick(e, image)}
      ImageSource={ImageSource}
    />
  )
}
