import { Container, Video as CoreVideo } from '@titicaca/core-elements'
import { FrameRatioAndSizes, GlobalSizes } from '@titicaca/type-definitions'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { CarouselImageMeta } from './types'

interface Props {
  medium: CarouselImageMeta
  height?: number
  globalSize?: GlobalSizes
  globalFrame?: FrameRatioAndSizes
  overlay?: ReactNode
}

const HEIGHT_OPTIONS: Partial<Record<GlobalSizes, string>> = {
  mini: '80px',
  small: '110px',
  medium: '200px',
  large: '400px',
}

const Frame = styled(Container)<{
  size?: GlobalSizes
  height?: number
  frame?: FrameRatioAndSizes
}>`
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  height: ${({ height, size }) =>
    (height && `${height}px`) || (size ? HEIGHT_OPTIONS[size] : '')};
`

function VideoContent({
  medium,
  height,
  globalSize,
  globalFrame,
  overlay,
}: Props) {
  const { frame: imageFrame, size: imageSize } = medium
  const size = globalSize || imageSize
  const frame = size ? undefined : globalFrame || imageFrame

  return (
    <Frame size={size} height={height} frame={frame}>
      <CoreVideo
        removeFrame
        frame="medium"
        src={medium.video?.large.url}
        fallbackImageUrl={medium.sizes.large.url}
        cloudinaryBucket={medium.cloudinaryBucket}
        cloudinaryId={medium.cloudinaryId}
      />
      {overlay || null}
    </Frame>
  )
}

export default VideoContent
