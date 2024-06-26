import { useEffect, useRef } from 'react'
import { styled } from 'styled-components'
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

const COMMON_WRAPPER_STYLE = { width: '100%', height: '100%', margin: 'auto' }

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
    if (visible) {
      onImageIntersecting(medium)
    } else {
      resetImage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <TransformWrapper
      wheel={{ wheelDisabled: true }}
      panning={{ disabled: true }}
      doubleClick={{ disabled: true }}
      ref={transformComponentRef}
    >
      <TransformComponent
        wrapperStyle={COMMON_WRAPPER_STYLE}
        contentStyle={COMMON_WRAPPER_STYLE}
      >
        <StyledImage src={medium.sizes.large.url} alt={medium.id} />
      </TransformComponent>
    </TransformWrapper>
  )
}
