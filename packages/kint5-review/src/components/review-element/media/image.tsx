import { Container, ThumbnailBorder } from '@titicaca/kint5-core-elements'
import { ImageMeta } from '@titicaca/type-definitions'
import styled from 'styled-components'

interface Props {
  medium: ImageMeta
}

const Wrapper = styled(Container)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

function Image({ medium }: Props) {
  return (
    <Wrapper>
      <Img src={medium.sizes.large.url} />
      <ThumbnailBorder />
    </Wrapper>
  )
}

export default Image