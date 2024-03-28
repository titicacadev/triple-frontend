import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch'
import { ImageMeta } from '@titicaca/type-definitions'

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`

export default function Image({
  medium,
  visible,
  onImageIntersecting,
}: {
  medium: ImageMeta
  visible: boolean
  onImageIntersecting: (image: ImageMeta) => void
}) {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

  const resetImage = () => {
    if (transformComponentRef.current) {
      const { resetTransform } = transformComponentRef.current
      resetTransform()
    }
  }

  useEffect(() => {
    if (!visible) {
      resetImage()
    } else {
      onImageIntersecting(medium)
    }
  }, [visible, medium, onImageIntersecting])

  return (
    <TransformWrapper
      wheel={{ wheelDisabled: true }}
      panning={{ disabled: true }}
      ref={transformComponentRef}
    >
      <TransformComponent
        wrapperStyle={{ width: '100%', height: '100%', margin: 'auto' }}
        contentStyle={{ width: '100%', height: '100%', margin: 'auto' }}
      >
        <StyledImage src={medium.sizes.large.url} alt={medium.id} />
      </TransformComponent>
    </TransformWrapper>
  )
}
