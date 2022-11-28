import { Container } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'
import styled from 'styled-components'

interface ImageFrame {
  value: {
    image: ImageMeta
  }
  onFrameClick?: () => void
}

const ImageContainer = styled(Container)`
  width: 100%;
`

export default function ImageFrame({
  value: { image },
  onFrameClick,
}: ImageFrame) {
  return (
    <ImageContainer onClick={onFrameClick}>
      <img src={image.sizes.full.url} alt="" width="100%" height="100%" />
    </ImageContainer>
  )
}
