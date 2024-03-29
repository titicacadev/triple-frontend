import { ImageSourceType } from '@titicaca/core-elements'
import {
  FrameRatioAndSizes,
  GlobalSizes,
  ImageMeta,
} from '@titicaca/type-definitions'
import { MouseEventHandler, ReactNode } from 'react'

import ImageContent from './image-content'
import VideoContent from './video-content'

interface Props {
  medium: ImageMeta
  optimized?: boolean
  height?: number
  globalSize?: GlobalSizes
  globalFrame?: FrameRatioAndSizes
  overlay?: ReactNode
  ImageSource?: ImageSourceType
  onClick?: MouseEventHandler
}

function Content({
  medium,
  optimized,
  height,
  globalSize,
  globalFrame,
  overlay,
  ImageSource,
  onClick,
}: Props) {
  const isVideo = medium.type === 'video'

  if (isVideo) {
    return (
      <VideoContent
        medium={medium}
        height={height}
        globalSize={globalSize}
        globalFrame={globalFrame}
        overlay={overlay}
        onClick={onClick}
      />
    )
  }

  return (
    <ImageContent
      medium={medium}
      optimized={optimized}
      height={height}
      globalSize={globalSize}
      globalFrame={globalFrame}
      overlay={overlay}
      ImageSource={ImageSource}
      onImageClick={onClick}
    />
  )
}

export default Content
