import { PropsWithChildren, useState } from 'react'
import Popup from '@titicaca/popup'
import { Container, Navbar } from '@titicaca/core-elements'

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

export function DetailViewerPopup({
  open,
  onClose,
  imageIndex: initialImageIndex,
}: DetailViewerPopupProp) {
  const [imageIndex, setImageIndex] = useState(initialImageIndex)

  function changeImageIndex(idx: number) {
    setImageIndex(idx)
  }

  return (
    <ImageViewerPopup open={open} onClose={onClose}>
      <Navbar css={{ height: NAVBAR_HEIGHT }}>
        <Navbar.Item icon="close" onClick={onClose} />
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
