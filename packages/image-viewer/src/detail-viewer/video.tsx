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
  cursor: pointer;

  &:focus {
    outline: none;
  }

  transition: opacity 0.3s;
`

interface VideoProps {
  medium: ImageMeta
  handleVideoClick?: (video?: ImageMeta) => void
}

export function Video({ medium, handleVideoClick }: VideoProps) {
  const { ref, isIntersecting } = useIntersection<HTMLVideoElement>({
    threshold: 0.5,
  })

  const {
    deviceState: { autoplay, networkType },
  } = useDeviceContext()

  const initialAutoPlaySetting =
    autoplay === 'always' ||
    (autoplay === 'wifi_only' && networkType === 'wifi')

  const [playing, setPlaying] = useState(initialAutoPlaySetting)

  useEffect(() => {
    async function togglePlay() {
      if (!ref.current) {
        return
      }

      try {
        if (playing && isIntersecting) {
          ref.current.play()
        } else if (!playing) {
          ref.current.pause()
        } else if (!isIntersecting) {
          ref.current.pause()
          ref.current.currentTime = 0
          !initialAutoPlaySetting && setPlaying(false)
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setPlaying(false)
        }
      }
    }

    togglePlay()
  }, [isIntersecting, ref, playing, initialAutoPlaySetting])

  const onVideoClick = () => {
    setPlaying(!playing)
    handleVideoClick?.(medium)
  }

  return (
    <VideoWrapper onClick={onVideoClick}>
      <video
        ref={ref}
        src={medium.video?.large.url}
        controls={false}
        loop={false}
        playsInline
        onEnded={() => setPlaying(false)}
      >
        <track kind="captions" />
      </video>
      {!playing && <PlayPauseButtonBase />}
    </VideoWrapper>
  )
}
