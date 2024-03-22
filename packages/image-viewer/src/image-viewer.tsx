import { PropsWithChildren, useState } from 'react'
import Popup from '@titicaca/popup'
import { Container, Navbar } from '@titicaca/core-elements'
import { useImagesContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

import DetailViewer from './detail-viewer'

function ImageViewerPopup({
  open,
  onClose,
  children,
}: PropsWithChildren<{ open: boolean; onClose: () => void }>) {
  return (
    <Popup open={open} onClose={onClose} noNavbar>
      {children}
    </Popup>
  )
}

export interface DetailViewerPopupProp {
  open: boolean
  onClose: () => void
  imageIndex: number
}

const NAVBAR_HEIGHT = 52

const Text = styled.span`
  font-size: 16px;
  height: 34px;
  line-height: 34px;
`

export function DetailViewerPopup({
  open,
  onClose,
  imageIndex: initialImageIndex,
}: DetailViewerPopupProp) {
  const { total } = useImagesContext()
  const [imageIndex, setImageIndex] = useState(initialImageIndex)

  function changeImageIndex(idx: number) {
    setImageIndex(idx)
  }

  return (
    <ImageViewerPopup open={open} onClose={onClose}>
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
    </ImageViewerPopup>
  )
}
