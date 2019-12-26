import * as React from 'react'
import styled from 'styled-components'

import { GlobalSizes, MEDIA_FRAME_OPTIONS } from '../commons'

const VideoContainer = styled.div<
  { frame: string; fallbackImageUrl: string } & React.HTMLAttributes<
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
}: {
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  fallbackImageUrl: string
  frame: GlobalSizes
}) {
  return (
    <VideoContainer frame={frame} fallbackImageUrl={fallbackImageUrl}>
      <VideoFrame autoPlay loop muted>
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

const MEDIA_CDN_URL_BASE = 'https://media.triple.guide'
const FORMATS = ['webm', 'mp4', 'ogv']

function Sources({
  cloudinaryBucket,
  cloudinaryId,
  frame,
}: {
  cloudinaryBucket: string
  cloudinaryId: string
  frame: GlobalSizes
}) {
  const [, heightOverWidthPercent] = MEDIA_FRAME_OPTIONS[frame].match(
    /^(\d+)%$/,
  )
  const widthOverHeight = 100 / parseInt(heightOverWidthPercent, 10)
  const manipulationParams = `c_fill,ar_${widthOverHeight},f_auto`

  return (
    <>
      {FORMATS.map((format) => (
        <source
          key={format}
          src={`${MEDIA_CDN_URL_BASE}/${cloudinaryBucket}/video/upload/${manipulationParams}/${cloudinaryId}.${format}`}
        />
      ))}
    </>
  )
}
