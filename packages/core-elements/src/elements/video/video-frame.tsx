import { PropsWithChildren, ReactNode } from 'react'

import { MEDIA_FRAME_OPTIONS, FrameRatioAndSizes } from '../../commons'
import Container from '../container'

interface Props {
  children?: ReactNode
  frame: FrameRatioAndSizes
  removeFrame: boolean
}

export default function VideoFrame({
  children,
  frame,
  removeFrame,
}: PropsWithChildren<Props>) {
  if (removeFrame) {
    return <>{children}</>
  }

  return (
    <Container
      position="relative"
      padding={{
        top: frame !== 'original' ? MEDIA_FRAME_OPTIONS[frame] : undefined,
      }}
    >
      <Container
        position="absolute"
        positioning={{ top: 0, left: 0 }}
        width="100%"
        height="100%"
      >
        {children}
      </Container>
    </Container>
  )
}
