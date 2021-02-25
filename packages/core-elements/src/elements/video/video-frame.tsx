import React from 'react'
import styled from 'styled-components'

import { MEDIA_FRAME_OPTIONS, FrameRatioAndSizes } from '../../commons'
import { formatMarginPadding } from '../../mixins'

import { useVideoState } from './context'

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

export default function VideoFrame({
  borderRadius,
  children,
}: React.PropsWithChildren<{
  borderRadius?: number
}>) {
  const { frame, fallbackImageUrl } = useVideoState()
  return (
    <VideoContainer
      borderRadius={borderRadius}
      frame={frame}
      fallbackImageUrl={fallbackImageUrl}
    >
      {children}
    </VideoContainer>
  )
}
