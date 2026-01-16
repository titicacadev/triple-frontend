import { useEffect, useRef, useState } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import { Container } from '@titicaca/tds-ui'
import { useInView } from 'react-intersection-observer'
import { useClientApp } from '@titicaca/triple-web'
import { styled } from 'styled-components'

interface Props {
  medium: ImageMeta
}

const StyledPoster = styled.div`
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

const StyledVideo = styled.video<{ $isOncePlayed: boolean }>`
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

export function Video({ medium }: Props) {
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

  return (
    <Container borderRadius={6} ref={inViewRef}>
      <StyledPoster
        style={{ backgroundImage: `url("${medium.sizes.large.url}")` }}
      />
      <StyledVideo
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
    </Container>
  )
}
