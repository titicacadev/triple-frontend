import { Container, Image, ImageSource } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'
import styled from 'styled-components'

interface ImageFrame {
  value: {
    image: ImageMeta
  }
  onFrameClick?: () => void
}

const ImageContainer = styled(Container)`
  flex-shrink: 0;
  position: relative;
  width: 100%;
`

export default function ImageFrame({
  value: { image },
  onFrameClick,
}: ImageFrame) {
  return (
    <ImageContainer onClick={onFrameClick}>
      <Image borderRadius={0}>
        <Image.FixedRatioFrame frame="large">
          <Image.Img src={image.sizes.large.url} />

          <Image.SourceUrl>
            <ImageSource sourceUrl={image.sourceUrl} />
          </Image.SourceUrl>
        </Image.FixedRatioFrame>
      </Image>
    </ImageContainer>
  )
}
