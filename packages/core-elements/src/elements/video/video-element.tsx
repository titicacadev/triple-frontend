import React from 'react'
import styled from 'styled-components'

import Sources from './sources'
import { useVideoState } from './context'
const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;

  overflow: hidden;
  object-fit: cover;
`

export default function VideoElement({
  videoRef,
  src,
  srcType,
  cloudinaryBucket,
  cloudinaryId,
  autoPlay,
  showNativeControls,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  autoPlay?: boolean
  showNativeControls?: boolean
}) {
  const { frame, fallbackImageUrl } = useVideoState()
  return (
    <Video
      loop
      playsInline
      controls={!!showNativeControls}
      autoPlay={autoPlay}
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
    </Video>
  )
}
