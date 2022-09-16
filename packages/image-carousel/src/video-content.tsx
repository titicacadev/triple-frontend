import { Container, Video as CoreVideo } from '@titicaca/core-elements'
import { FrameRatioAndSizes, GlobalSizes } from '@titicaca/type-definitions'
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { useDeviceContext } from '@titicaca/react-contexts'
import { useIntersection } from '@titicaca/intersection-observer'

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
  const { ref, isIntersecting } = useIntersection<HTMLVideoElement>({
    threshold: 0.5,
  })

  const {
    deviceState: { autoplay, networkType },
  } = useDeviceContext()

  const videoAutoplay =
    autoplay === 'always' ||
    (autoplay === 'wifi_only' && networkType === 'wifi')

  useEffect(() => {
    if (!videoAutoplay) {
      return
    }

    if (isIntersecting) {
      ref.current?.play()
    } else {
      ref.current?.pause()
    }
  }, [isIntersecting, ref, videoAutoplay])

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
        muted
        hideControls
        initialControlsHidden
        ref={ref}
      />
      {overlay || null}
    </Frame>
  )
}

export default VideoContent
