import React, { useRef, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { MEDIA_FRAME_OPTIONS, FrameRatioAndSizes } from '../../commons'
import { formatMarginPadding } from '../../mixins'
import Sources from './sources'
import Controls from './controls'

const VideoContainer = styled.div<{
  frame: FrameRatioAndSizes
  fallbackImageUrl: string
  borderRadius?: number
}>`
  width: 100%;
  overflow: hidden;
  height: 0;
  position: relative;
  background-image: url(${({ fallbackImageUrl }) => fallbackImageUrl});
  background-size: cover;
  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;

  ${({ frame }) =>
    frame !== 'original' &&
    formatMarginPadding(
      { top: MEDIA_FRAME_OPTIONS[frame || 'small'] },
      'padding',
    )}
`

const VideoFrame = styled.video`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
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
  borderRadius,
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [pending, setPending] = useState(true)

  const handlePending = useCallback(() => setPending(true), [setPending])
  const handleReady = useCallback(() => setPending(false), [setPending])

  useEffect(() => {
    const currentRef = videoRef.current

    if (currentRef) {
      currentRef.addEventListener('canplaythrough', handleReady)
      currentRef.addEventListener('canplay', handleReady)
      currentRef.addEventListener('play', handleReady)
      currentRef.addEventListener('waiting', handlePending)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('canplaythrough', handleReady)
        currentRef.removeEventListener('canplay', handleReady)
        currentRef.removeEventListener('play', handleReady)
        currentRef.removeEventListener('waiting', handlePending)
      }
    }
  }, [videoRef, handleReady, handlePending])

  return (
    <VideoContainer
      frame={frame}
      fallbackImageUrl={fallbackImageUrl}
      borderRadius={borderRadius}
    >
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
        <Controls videoRef={videoRef} muted={!!autoPlay} />
      )}
    </VideoContainer>
  )
}
