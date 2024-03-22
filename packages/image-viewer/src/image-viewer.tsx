import { PropsWithChildren, useState } from 'react'
import Popup from '@titicaca/popup'
import { Container, Navbar } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'
import { useImagesContext, useUserAgentContext } from '@titicaca/react-contexts'

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

const Button = styled.button<{ direction: 'next' | 'prev' }>`
  position: absolute;
  background-image: url('https://assets.triple.guide/images/ico-arrow-right-black@3x.png');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  width: 44px;
  height: 44px;
  top: 50%;
  border: 1px solid var(--color-gray100);
  ${({ direction }) =>
    direction === 'next'
      ? css`
          transform: translateY(-50%);
          right: 20px;
        `
      : css`
          transform: rotate(180deg) translateY(50%);
          left: 20px;
        `}
  background-color: white;
  border-radius: 50%;
`

export function DetailViewerPopup({
  open,
  onClose,
  imageIndex: initialImageIndex,
}: DetailViewerPopupProp) {
  const { isMobile } = useUserAgentContext()

  const { total } = useImagesContext()
  const [imageIndex, setImageIndex] = useState(initialImageIndex)

  function showNextImage() {
    setImageIndex((imageIndex + 1) % total)
  }

  function showPrevImage() {
    setImageIndex(imageIndex === 0 ? total - 1 : imageIndex - 1)
  }

  return (
    <ImageViewerPopup open={open} onClose={onClose}>
      <Navbar css={{ height: NAVBAR_HEIGHT }}>
        <Navbar.Item icon="close" onClick={onClose} />
      </Navbar>
      <Container
        css={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, width: '100vw' }}
      >
        <DetailViewer imageIndex={imageIndex} />
        {!isMobile ? (
          <>
            <Button direction="prev" onClick={showPrevImage} />
            <Button direction="next" onClick={showNextImage} />
          </>
        ) : null}
      </Container>
    </ImageViewerPopup>
  )
}
