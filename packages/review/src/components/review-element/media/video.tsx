import { ImageMeta } from '@titicaca/type-definitions'
import { Container, Video as TfVideo } from '@titicaca/core-elements'

interface Props {
  medium: ImageMeta
  autoPlay?: boolean
}

function Video({ medium, autoPlay }: Props) {
  return (
    <Container borderRadius={6}>
      <TfVideo
        removeFrame
        autoPlay={autoPlay}
        frame="medium"
        src={medium.video?.large.url}
        fallbackImageUrl={medium.sizes.large.url}
        cloudinaryBucket={medium.cloudinaryBucket}
        cloudinaryId={medium.cloudinaryId}
      />
    </Container>
  )
}

export default Video
