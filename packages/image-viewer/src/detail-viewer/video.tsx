import { useEffect, useRef } from 'react'
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

interface VideoProps {
  visible: boolean
  medium: ImageMeta
  onVideoIntersecting: (medium: ImageMeta) => void
}

export function Video({ medium, visible, onVideoIntersecting }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

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
          // do nothing
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
        src={`${medium.video?.large.url}#t=0.001`} // HACK: ios에서 썸네일이 노출되지 않는 문제 우회
        poster={medium.sizes.large.url}
        preload="metadata"
        controls
        loop={false}
        autoPlay={false}
        playsInline
        controlsList="nodownload"
      >
        <track kind="captions" />
      </video>
    </VideoWrapper>
  )
}
