import styled from 'styled-components'
import { useState } from 'react'

import { Container } from '../../../core-elements/src'
import { useImagesContext } from '../../../react-contexts/src'

const Image = styled.img``

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
    <Container css={{ width: '100%', height: '100%' }}>
      <Image src={image.sizes.large.url} alt={image.id} />
    </Container>
  )
}
