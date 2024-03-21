import { PropsWithChildren } from 'react'

import Popup from '../../popup/src/popup'
import { Container, Navbar } from '../../core-elements/src'

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
  imageIndex,
}: DetailViewerPopupProp) {
  return (
    <ImageViewerPopup open={open} onClose={onClose}>
      <Navbar css={{ height: NAVBAR_HEIGHT }}>
        <Navbar.Item icon="close" onClick={onClose} />
      </Navbar>
      <Container
        css={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, width: '100vw' }}
      >
        <DetailViewer imageIndex={imageIndex} />
      </Container>
    </ImageViewerPopup>
  )
}
