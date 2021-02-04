import React from 'react'
import styled from 'styled-components'

import { FrameRatioAndSizes } from '../../commons'

import { useVideoRef } from './use-video-ref'
import Sources from './sources'
import Controls from './controls'

const VideoFrame = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;

  overflow: hidden;
  object-fit: cover;
`

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
  fallbackImageUrl,
  frame,
  autoPlay,
  hideControls,
  showNativeControls,
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
}) {
  const { videoRef, pending } = useVideoRef()

  return (
    <>
      <VideoFrame
        controls={!!showNativeControls}
        autoPlay={autoPlay}
        loop
        playsInline
        muted={autoPlay}
        ref={videoRef}
        poster={fallbackImageUrl}
      >
        <Sources
          src={src}
          srcType={srcType}
          cloudinaryBucket={cloudinaryBucket}
          cloudinaryId={cloudinaryId}
          frame={frame}
        />
      </VideoFrame>
      {pending && <Pending />}
      {videoRef && !hideControls && (
        <Controls videoRef={videoRef} autoPlay={!!autoPlay} />
      )}
    </>
  )
}
