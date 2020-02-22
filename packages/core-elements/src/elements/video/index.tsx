import React, { useRef, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { GlobalSizes, MEDIA_FRAME_OPTIONS } from '../../commons'
import Sources from './sources'
import Controls from './controls'

const VideoContainer = styled.div<
  { frame: GlobalSizes; fallbackImageUrl: string } & React.HTMLAttributes<
    HTMLDivElement
  >
>`
  padding-top: ${({ frame }) => MEDIA_FRAME_OPTIONS[frame]};
  width: 100%;
  overflow: hidden;
  height: 0;
  position: relative;
  background-image: url(${({ fallbackImageUrl }) => fallbackImageUrl});
  background-size: cover;
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
  background-image: url(https://assets.triple-dev.titicaca-corp.com/images/img-video-loading@3x.png);
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
}: {
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  fallbackImageUrl: string
  frame: GlobalSizes
  autoPlay?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [pending, setPending] = useState(true)

  const handlePending = useCallback(() => setPending(true), [setPending])
  const handleReady = useCallback(() => setPending(false), [setPending])

  useEffect(() => {
    const currentRef = videoRef.current

    if (currentRef) {
      currentRef.addEventListener('canplaythrough', handleReady)
      currentRef.addEventListener('waiting', handlePending)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('canplaythrough', handleReady)
        currentRef.removeEventListener('waiting', handlePending)
      }
    }
  }, [videoRef, handleReady, handlePending])

  return (
    <VideoContainer frame={frame} fallbackImageUrl={fallbackImageUrl}>
      <VideoFrame autoPlay={autoPlay} loop muted ref={videoRef}>
        <Sources
          src={src}
          srcType={srcType}
          cloudinaryBucket={cloudinaryBucket}
          cloudinaryId={cloudinaryId}
          frame={frame}
        />
      </VideoFrame>
      {pending && <Pending />}
      {videoRef && <Controls videoRef={videoRef} />}
    </VideoContainer>
  )
}
