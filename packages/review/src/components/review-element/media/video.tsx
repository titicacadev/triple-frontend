import { ImageMeta } from '@titicaca/type-definitions'
import { Container } from '@titicaca/core-elements'
import { useIntersection } from '@titicaca/intersection-observer'
import { useEffect } from 'react'
import { useDeviceContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

interface Props {
  medium: ImageMeta
}

const StyledVideo = styled.video`
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

const PlayPauseButtonBase = styled.button`
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

function Video({ medium }: Props) {
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

  return (
    <Container borderRadius={6}>
      <StyledVideo
        ref={ref}
        src={medium.video?.large.url}
        controls={false}
        loop
        muted
        playsInline
      />
      {!videoAutoplay && <PlayPauseButtonBase disabled />}
    </Container>
  )
}

export default Video
