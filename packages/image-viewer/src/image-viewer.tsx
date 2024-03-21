import { PropsWithChildren } from 'react'

import Popup from '../../popup/src/popup'

import DetailViewer from './detail-viewer'

function ImageViewerPopup({
  open,
  onClose,
  children,
}: PropsWithChildren<{ open: boolean; onClose: () => void }>) {
  return (
    <Popup open={open} onClose={onClose}>
      {children}
    </Popup>
  )
}

export interface DetailViewerPopupProp {
  open: boolean
  onClose: () => void
  imageIndex: number
}

export function DetailViewerPopup({
  open,
  onClose,
  imageIndex,
}: DetailViewerPopupProp) {
  return (
    <ImageViewerPopup open={open} onClose={onClose}>
      <DetailViewer imageIndex={imageIndex} />
    </ImageViewerPopup>
  )
}
