import { forwardRef } from 'react'

import { FrameRatioAndSizes } from '../../commons'

import { VideoFrame } from './video-frame'
import { VideoElement } from './video-element'

interface Props {
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  fallbackImageUrl: string
  frame: FrameRatioAndSizes
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  borderRadius?: number
  hideControls?: boolean
  initialControlsHidden?: boolean
  showNativeControls?: boolean
  removeFrame?: boolean
}

export const Video = forwardRef<HTMLVideoElement, Props>(
  (
    {
      src,
      srcType = 'video/mp4',
      cloudinaryBucket,
      cloudinaryId,
      autoPlay,
      muted,
      loop = true,
      hideControls,
      initialControlsHidden,
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
          loop={loop}
          showNativeControls={showNativeControls}
          hideControls={hideControls}
          initialControlsHidden={initialControlsHidden}
          ref={ref}
        />
      </VideoFrame>
    )
  },
)

Video.displayName = 'Video'
