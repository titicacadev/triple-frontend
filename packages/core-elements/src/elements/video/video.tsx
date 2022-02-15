import { FrameRatioAndSizes } from '../../commons'

import VideoFrame from './video-frame'
import VideoElement from './video-element'

export default function Video({
  src,
  srcType = 'video/mp4',
  cloudinaryBucket,
  cloudinaryId,
  autoPlay,
  hideControls,
  showNativeControls,
  frame,
  fallbackImageUrl,
  removeFrame,
}: {
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  fallbackImageUrl: string
  frame: FrameRatioAndSizes
  autoPlay?: boolean
  borderRadius?: number
  hideControls?: boolean
  showNativeControls?: boolean
  removeFrame?: boolean
}) {
  return (
    <VideoFrame
      removeFrame={removeFrame}
      frame={frame}
      fallbackImageUrl={fallbackImageUrl}
    >
      <VideoElement
        src={src}
        srcType={srcType}
        cloudinaryBucket={cloudinaryBucket}
        cloudinaryId={cloudinaryId}
        autoPlay={autoPlay}
        showNativeControls={showNativeControls}
        hideControls={hideControls}
      />
    </VideoFrame>
  )
}
