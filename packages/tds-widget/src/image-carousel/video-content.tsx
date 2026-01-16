import { Container } from '@titicaca/tds-ui'
import { FrameRatioAndSizes, GlobalSizes } from '@titicaca/type-definitions'
import {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { styled } from 'styled-components'
import { useClientApp } from '@titicaca/triple-web'
import { useInView } from 'react-intersection-observer'

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
  $size?: GlobalSizes
  $height?: number
  $frame?: FrameRatioAndSizes
}>`
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${({ $height, $size }) =>
    ($height && `${$height}px`) || ($size ? HEIGHT_OPTIONS[$size] : '')};
`

const Poster = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`

const Video = styled.video<{ $isOncePlayed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
  opacity: ${({ $isOncePlayed }) => ($isOncePlayed ? 1 : 0)};
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

export function VideoContent({
  medium,
  height,
  globalSize,
  globalFrame,
  overlay,
  onClick,
}: Props) {
  const [isOncePlayed, setIsOncePlayed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: inViewRef, inView: isIntersecting } = useInView({
    threshold: 0.5,
  })
  const clientApp = useClientApp()

  const [videoAutoplay, setVideoAutoPlay] = useState(
    !clientApp ||
      clientApp?.device.autoplay === 'always' ||
      (clientApp?.device.autoplay === 'wifi_only' &&
        clientApp?.device.networkType === 'wifi'),
  )

  useEffect(() => {
    async function togglePlay() {
      if (!videoAutoplay || !videoRef.current) {
        return
      }

      videoRef.current.playsInline = true
      videoRef.current.muted = true

      try {
        if (isIntersecting) {
          videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setVideoAutoPlay(false)
        }
      }
    }

    togglePlay()
  }, [isIntersecting, videoAutoplay])

  const { frame: imageFrame, size: imageSize } = medium
  const size = globalSize || imageSize
  const frame = size ? undefined : globalFrame || imageFrame

  return (
    <Frame
      $size={size}
      $height={height}
      $frame={frame}
      onClick={onClick}
      ref={inViewRef}
    >
      <Poster style={{ backgroundImage: `url("${medium.sizes.large.url}")` }} />
      <Video
        ref={videoRef}
        src={medium.video?.large.url}
        controls={false}
        loop
        muted
        playsInline
        $isOncePlayed={isOncePlayed}
        onTimeUpdate={isOncePlayed ? undefined : () => setIsOncePlayed(true)}
      />
      {!videoAutoplay && <PlayPauseButtonBase />}
      {overlay || null}
    </Frame>
  )
}
