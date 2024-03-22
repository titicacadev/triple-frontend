import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'
import { useImagesContext } from '@titicaca/react-contexts'

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`

const SourceUrl = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: var(--color-white900);
  padding: 20px;
  font-size: 12px;
  line-height: 12px;
  height: 54px;
  color: var(--color-gray700);
`

const SOURCE_HEIGHT = 54

export interface DetailViewerProp {
  imageIndex: number
}

export default function DetailViewer({ imageIndex }: DetailViewerProp) {
  const { images } = useImagesContext()

  const image = images[imageIndex]

  return (
    <Container css={{ position: 'relative', width: '100%', height: '100%' }}>
      <Container
        css={{
          width: '100%',
          height: `calc(100% - ${image.sourceUrl ? SOURCE_HEIGHT : 0}px)`,
          display: 'flex',
        }}
      >
        <Image src={image.sizes.large.url} alt={image.id} />
      </Container>
      {image.sourceUrl ? <SourceUrl>{image.sourceUrl}</SourceUrl> : null}
    </Container>
  )
}
