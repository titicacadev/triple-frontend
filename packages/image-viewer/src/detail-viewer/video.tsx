import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ImageMeta } from '@titicaca/type-definitions'
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
  visible: boolean
  medium: ImageMeta
  handleVideoClick?: (video?: ImageMeta, playing?: boolean) => void
  onVideoIntersecting: (media: ImageMeta) => void
}

export function Video({
  medium,
  handleVideoClick,
  visible,
  onVideoIntersecting,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    async function stopVideoOnNonIntersection() {
      if (!videoRef.current) {
        return
      }

      try {
        if (!visible) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setPlaying(false)
        }
      }
    }

    stopVideoOnNonIntersection()
  }, [visible, videoRef])

  useEffect(() => {
    if (visible) {
      onVideoIntersecting(medium)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <VideoWrapper>
      <video
        ref={videoRef}
        src={medium.video?.large.url}
        controls
        loop={false}
        autoPlay={false}
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={() => handleVideoClick?.(medium, !playing)}
        controlsList="nodownload"
      >
        <track kind="captions" />
      </video>
      {!playing && <PlayPauseButton />}
    </VideoWrapper>
  )
}
