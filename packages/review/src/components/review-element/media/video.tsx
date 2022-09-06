import { ImageMeta } from '@titicaca/type-definitions'
import { Container, Video as TfVideo } from '@titicaca/core-elements'
import { useIntersection } from '@titicaca/intersection-observer'
import { useEffect } from 'react'
import { useDeviceContext } from '@titicaca/react-contexts'

interface Props {
  medium: ImageMeta
}

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
  }, [isIntersecting, videoAutoplay])

  return (
    <Container borderRadius={6}>
      <TfVideo
        removeFrame
        frame="medium"
        src={medium.video?.large.url}
        fallbackImageUrl={medium.sizes.large.url}
        cloudinaryBucket={medium.cloudinaryBucket}
        cloudinaryId={medium.cloudinaryId}
        muted
        initialControlHidden
        ref={ref}
      />
    </Container>
  )
}

export default Video
