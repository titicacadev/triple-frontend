import { ComponentProps, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch'

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`

export default function Image({
  visible,
  ...props
}: ComponentProps<typeof StyledImage> & { visible: boolean }) {
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
    }
  }, [visible])

  return (
    <TransformWrapper
      wheel={{ wheelDisabled: true }}
      panning={{ disabled: true }}
      doubleClick={{ disabled: true }}
      ref={transformComponentRef}
    >
      <TransformComponent
        wrapperStyle={{ width: '100%', height: '100%', margin: 'auto' }}
        contentStyle={{ width: '100%', height: '100%', margin: 'auto' }}
      >
        <StyledImage {...props} />
      </TransformComponent>
    </TransformWrapper>
  )
}
