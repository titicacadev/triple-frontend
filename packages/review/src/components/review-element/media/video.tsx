import { ImageMeta } from '@titicaca/type-definitions'
import { Container, Video as TfVideo } from '@titicaca/core-elements'

interface Props {
  medium: ImageMeta
}

function Video({ medium }: Props) {
  return (
    <Container borderRadius={6}>
      <TfVideo
        removeFrame
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
