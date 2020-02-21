import * as React from 'react'
import styled from 'styled-components'

import { GlobalSizes, MEDIA_FRAME_OPTIONS } from '../../commons'
import Sources from './sources'

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
  return (
    <VideoContainer frame={frame} fallbackImageUrl={fallbackImageUrl}>
      <VideoFrame autoPlay={autoPlay} loop muted>
        {cloudinaryBucket && cloudinaryId ? (
          <Sources
            cloudinaryBucket={cloudinaryBucket}
            cloudinaryId={cloudinaryId}
            frame={frame}
          />
        ) : (
          <source src={src} type={srcType} />
        )}
      </VideoFrame>
    </VideoContainer>
  )
}
