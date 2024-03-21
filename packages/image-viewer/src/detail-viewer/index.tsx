import styled from 'styled-components'
import { useState } from 'react'
import { Container } from '@titicaca/core-elements'
import { useImagesContext } from '@titicaca/react-contexts'

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`

export interface DetailViewerProp {
  imageIndex: number
}

export default function DetailViewer({
  imageIndex: initialImageIndex,
}: DetailViewerProp) {
  const [imageIndex] = useState(initialImageIndex)
  const { images } = useImagesContext()

  const image = images[imageIndex]

  return (
    <Container css={{ width: '100%', height: '100%', display: 'flex' }}>
      <Image src={image.sizes.large.url} alt={image.id} />
    </Container>
  )
}
