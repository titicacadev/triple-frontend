import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ImageMeta } from '@titicaca/type-definitions'
import { useIntersection } from '@titicaca/intersection-observer'
import { useDeviceContext } from '@titicaca/react-contexts'
import { Container } from '@titicaca/core-elements'

const VideoWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
`

const PLAY_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-play@3x.png'

const PlayPauseButton = styled.button`
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
  pointer-events: none;

  &:focus {
    outline: none;
  }
`

interface VideoProps {
  medium: ImageMeta
  handleVideoClick?: (video?: ImageMeta, playing?: boolean) => void
}

export function Video({ medium, handleVideoClick }: VideoProps) {
  const { ref, isIntersecting } = useIntersection<HTMLVideoElement>({
    threshold: 0.5,
  })

  const {
    deviceState: { autoplay, networkType },
  } = useDeviceContext()

  const autoPlay =
    autoplay === 'always' ||
    (autoplay === 'wifi_only' && networkType === 'wifi')

  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    async function stopVideoOnNonIntersection() {
      if (!ref.current) {
        return
      }

      try {
        if (!isIntersecting) {
          ref.current.pause()
          ref.current.currentTime = 0
          !autoPlay && setPlaying(false)
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setPlaying(false)
        }
      }
    }

    stopVideoOnNonIntersection()
  }, [isIntersecting, ref, autoPlay])

  return (
    <VideoWrapper>
      <video
        ref={ref}
        src={medium.video?.large.url}
        controls
        loop={false}
        playsInline
        autoPlay={autoPlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={() => handleVideoClick?.(medium, !playing)}
      >
        <track kind="captions" />
      </video>
      {!playing && <PlayPauseButton />}
    </VideoWrapper>
  )
}
