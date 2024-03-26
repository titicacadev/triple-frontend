import { useEffect, useState } from 'react'
import Popup from '@titicaca/popup'
import { Container, Navbar } from '@titicaca/core-elements'
import { useImagesContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

import DetailViewer from './detail-viewer'

const NAVBAR_HEIGHT = 52

const Text = styled.span`
  font-size: 16px;
  height: 34px;
  line-height: 34px;
`

export interface ImageViewerPopupProps {
  open: boolean
  onClose?: () => void
  defaultImageIndex: number | null
}
/**
 *
 * @param defaultImageIndex: 이미지 확대뷰로 띄울 이미지의 index. TODD: null인 경우에는 격자뷰가 뜨게 됩니다.
 */
export function ImageViewerPopup({
  open,
  onClose,
  defaultImageIndex,
}: ImageViewerPopupProps) {
  const [imageIndex, setImageIndex] = useState<null | number>(defaultImageIndex)

  useEffect(() => {
    setImageIndex(defaultImageIndex)
  }, [defaultImageIndex])

  function handleClose() {
    setImageIndex(null)
    onClose?.()
  }
  return (
    <Popup open={open} onClose={handleClose} noNavbar>
      {imageIndex != null ? (
        <DetailViewerContainer onClose={handleClose} imageIndex={imageIndex} />
      ) : null}
    </Popup>
  )
}

export interface DetailViewerContainerProp {
  onClose?: () => void
  imageIndex: number
}

export function DetailViewerContainer({
  onClose,
  imageIndex: initialImageIndex,
}: DetailViewerContainerProp) {
  const { total } = useImagesContext()
  const [imageIndex, setImageIndex] = useState(initialImageIndex)

  function changeImageIndex(idx: number) {
    setImageIndex(idx)
  }

  useEffect(() => {
    setImageIndex(initialImageIndex)
  }, [initialImageIndex])

  return (
    <>
      <Navbar
        css={{
          height: NAVBAR_HEIGHT,
          display: 'flex',
        }}
      >
        <Navbar.Item
          icon="close"
          onClick={onClose}
          css={{ position: 'absolute' }}
        />
        <Navbar.Item
          css={{
            float: 'none',
            margin: 0,
            flexGrow: 1,
            textAlign: 'center',
          }}
        >
          <Text>{imageIndex + 1}</Text>
          <Text css={{ color: 'var(--color-gray300)' }}>&nbsp;/ {total}</Text>
        </Navbar.Item>
      </Navbar>
      <Container
        css={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, width: '100vw' }}
      >
        <DetailViewer
          imageIndex={imageIndex}
          changeImageIndex={changeImageIndex}
        />
      </Container>
    </>
  )
}
