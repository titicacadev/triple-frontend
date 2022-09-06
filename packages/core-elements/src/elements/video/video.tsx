import { forwardRef } from 'react'

import { FrameRatioAndSizes } from '../../commons'

import VideoFrame from './video-frame'
import VideoElement from './video-element'

interface Props {
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  fallbackImageUrl: string
  frame: FrameRatioAndSizes
  autoPlay?: boolean
  muted?: boolean
  borderRadius?: number
  hideControls?: boolean
  initialControlHidden?: boolean
  showNativeControls?: boolean
  removeFrame?: boolean
}

const Video = forwardRef<HTMLVideoElement, Props>(
  (
    {
      src,
      srcType = 'video/mp4',
      cloudinaryBucket,
      cloudinaryId,
      autoPlay,
      muted,
      hideControls,
      initialControlHidden,
      showNativeControls,
      frame,
      fallbackImageUrl,
      removeFrame,
    },
    ref,
  ) => {
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
          muted={muted}
          showNativeControls={showNativeControls}
          hideControls={hideControls}
          initialControlHidden={initialControlHidden}
          ref={ref}
        />
      </VideoFrame>
    )
  },
)

Video.displayName = 'Video'

export default Video
