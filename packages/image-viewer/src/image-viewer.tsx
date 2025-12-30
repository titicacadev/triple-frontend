import { useEffect, useState } from 'react'
import Popup from '@titicaca/popup'
import { Container, Navbar } from '@titicaca/core-elements'
import styled from 'styled-components'

import DetailViewer, { DetailViewerProp } from './detail-viewer'

const NAVBAR_HEIGHT = 52

const Text = styled.span`
  font-size: 16px;
  height: 34px;
  line-height: 34px;
`

const GrayText = styled(Text)`
  color: var(--color-gray300);
`

export interface ImageViewerPopupProps
  extends Pick<
    DetailViewerProp,
    'images' | 'totalCount' | 'fetchNext' | 'onImageMetadataIntersecting'
  > {
  open: boolean
  onClose?: () => void
  defaultImageIndex?: number | null
}
/**
 *
 * @param defaultImageIndex: 이미지 확대뷰로 띄울 이미지의 index. TODD: null인 경우에는 격자뷰가 뜨게 됩니다.
 */
export function ImageViewerPopup({
  open,
  onClose,
  images,
  totalCount,
  fetchNext,
  defaultImageIndex,
  onImageMetadataIntersecting,
}: ImageViewerPopupProps) {
  const [imageIndex, setImageIndex] = useState<null | number>(
    defaultImageIndex ?? null,
  )

  useEffect(() => {
    setImageIndex(defaultImageIndex ?? null)
  }, [defaultImageIndex])

  function changeImageIndex(idx: number) {
    setImageIndex(idx)
  }

  function handleClose() {
    setImageIndex(null)
    onClose?.()
  }
  return (
    <Popup open={open} onClose={handleClose} noNavbar>
      {imageIndex != null ? (
        <DetailViewerContainer
          onClose={handleClose}
          imageIndex={imageIndex}
          changeImageIndex={changeImageIndex}
          onImageMetadataIntersecting={onImageMetadataIntersecting}
          images={images}
          totalCount={totalCount}
          fetchNext={fetchNext}
        />
      ) : null}
    </Popup>
  )
}

export interface DetailViewerContainerProp
  extends Pick<
    DetailViewerProp,
    | 'images'
    | 'totalCount'
    | 'fetchNext'
    | 'imageIndex'
    | 'onImageMetadataIntersecting'
  > {
  onClose?: () => void
  changeImageIndex: (index: number) => void
}

export function DetailViewerContainer({
  onClose,
  imageIndex,
  changeImageIndex,
  images,
  totalCount,
  fetchNext,
  onImageMetadataIntersecting,
}: DetailViewerContainerProp) {
  return (
    <>
      <Navbar
        css={{
          height: NAVBAR_HEIGHT,
          display: 'flex',
          zIndex: 9999,
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
          <GrayText>&nbsp;/ {totalCount}</GrayText>
        </Navbar.Item>
      </Navbar>
      <Container
        css={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, width: '100vw' }}
      >
        <DetailViewer
          images={images}
          totalCount={totalCount}
          fetchNext={fetchNext}
          imageIndex={imageIndex}
          changeImageIndex={changeImageIndex}
          onImageMetadataIntersecting={onImageMetadataIntersecting}
        />
      </Container>
    </>
  )
}
