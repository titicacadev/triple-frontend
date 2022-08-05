import { ImageMeta } from '@titicaca/type-definitions'
import { Container, Video as TfVideo } from '@titicaca/core-elements'
import styled from 'styled-components'

interface Props {
  medium: ImageMeta
}

const Frame = styled(Container)`
  border-radius: 6px;
  overflow: hidden;
`

function Video({ medium }: Props) {
  return (
    <Frame>
      <TfVideo
        removeFrame
        frame="medium"
        src={medium.video?.large.url}
        fallbackImageUrl={medium.sizes.large.url}
        cloudinaryBucket={medium.cloudinaryBucket}
        cloudinaryId={medium.cloudinaryId}
      />
    </Frame>
  )
}

export default Video
