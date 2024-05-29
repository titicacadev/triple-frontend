import { ImageSourceType } from '@titicaca/kint5-core-elements'
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
  hideControls?: boolean
  showNativeControls?: boolean
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
  hideControls,
  showNativeControls,
  ImageSource,
  onClick,
}: Props) {
  if (medium.type === 'video') {
    return (
      <VideoContent
        medium={medium}
        globalSize={globalSize}
        globalFrame={globalFrame}
        hideControls={hideControls}
        showNativeControls={showNativeControls}
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
