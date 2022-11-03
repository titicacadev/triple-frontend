import { Container } from '@titicaca/core-elements'
import { FrameRatioAndSizes, GlobalSizes } from '@titicaca/type-definitions'
import { MouseEventHandler, ReactNode, useEffect } from 'react'
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
  onClick?: MouseEventHandler
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

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PLAY_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-play@3x.png'

const PlayPauseButtonBase = styled.span`
  position: absolute;
  border: none;
  background: none;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${PLAY_BUTTON_IMAGE_URL});
  background-size: cover;

  &:focus {
    outline: none;
  }
  transition: opacity 0.3s;
`

function VideoContent({
  medium,
  height,
  globalSize,
  globalFrame,
  overlay,
  onClick,
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
    async function togglePlay() {
      if (!videoAutoplay || !ref.current) {
        return
      }

      ref.current.playsInline = true
      ref.current.muted = true

      try {
        if (isIntersecting) {
          ref.current.play()
        } else {
          ref.current.pause()
        }
      } catch {}
    }

    togglePlay()
  }, [isIntersecting, ref, videoAutoplay])

  const { frame: imageFrame, size: imageSize } = medium
  const size = globalSize || imageSize
  const frame = size ? undefined : globalFrame || imageFrame

  return (
    <Frame size={size} height={height} frame={frame} onClick={onClick}>
      <Video
        ref={ref}
        src={medium.video?.large.url}
        controls={false}
        loop
        muted
        playsInline
        poster={medium.sizes.large.url}
      />
      {!videoAutoplay && <PlayPauseButtonBase />}
      {overlay || null}
    </Frame>
  )
}

export default VideoContent
