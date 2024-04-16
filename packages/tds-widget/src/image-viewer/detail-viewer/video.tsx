import { useEffect, useRef } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import { Container } from '@titicaca/tds-ui'

interface VideoProps {
  visible: boolean
  videoMetadata: ImageMeta
  onVideoIntersecting: (video: ImageMeta) => void
}

export function Video({
  videoMetadata,
  visible,
  onVideoIntersecting,
}: VideoProps) {
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
      onVideoIntersecting(videoMetadata)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Container
      css={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      <video
        ref={videoRef}
        src={`${videoMetadata.video?.large.url}#t=0.001`} // HACK: ios에서 썸네일이 노출되지 않는 문제 우회
        poster={videoMetadata.sizes.large.url}
        preload="metadata"
        controls
        loop={false}
        autoPlay={false}
        playsInline
        controlsList="nodownload"
      >
        <track kind="captions" />
      </video>
    </Container>
  )
}
