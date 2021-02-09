import React from 'react'
import styled from 'styled-components'

import { FrameRatioAndSizes } from '../../commons'

import { useVideoRef } from './use-video-ref'
import Controls from './controls'
import VideoFrame from './video-frame'
import VideoElement from './video-element'

const Pending = styled.div`
  position: absolute;
  border: none;
  background: none;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  top: 50%;
  left: 50%;
  background-image: url(https://assets.triple.guide/images/img-video-loading@3x.png);
  background-size: cover;
  animation: rotation 2s infinite linear;

  @keyframes rotation {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(359deg);
    }
  }
`

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
  const { videoRef, pending } = useVideoRef()

  return (
    <VideoFrame
      removeFrame={removeFrame}
      frame={frame}
      fallbackImageUrl={fallbackImageUrl}
    >
      <VideoElement
        videoRef={videoRef}
        src={src}
        srcType={srcType}
        cloudinaryBucket={cloudinaryBucket}
        cloudinaryId={cloudinaryId}
        autoPlay={autoPlay}
        showNativeControls={showNativeControls}
      />
      {pending && <Pending />}
      {videoRef && !hideControls && (
        <Controls videoRef={videoRef} autoPlay={!!autoPlay} />
      )}
    </VideoFrame>
  )
}
