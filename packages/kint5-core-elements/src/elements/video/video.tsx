import { MouseEventHandler, forwardRef } from 'react'

import { FrameRatioAndSizes } from '../../commons'

import { VideoFrame } from './video-frame'
import { VideoElement } from './video-element'
import {
  MuteButtonPosition,
  MuteButtonPositionProvider,
} from './mute-button-position-context'

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
  muteButtonPosition?: MuteButtonPosition
  onClick?: MouseEventHandler
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
      borderRadius,
      muteButtonPosition,
      onClick,
    },
    ref,
  ) => {
    return (
      <MuteButtonPositionProvider muteButtonPosition={muteButtonPosition}>
        <VideoFrame
          borderRadius={borderRadius}
          removeFrame={removeFrame}
          frame={frame}
          fallbackImageUrl={fallbackImageUrl}
          onClick={onClick}
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
      </MuteButtonPositionProvider>
    )
  },
)

Video.displayName = 'Video'
