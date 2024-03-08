import { useState } from 'react'
import ImageCarousel, { CarouselImageMeta } from '@titicaca/image-carousel'
import {
  Container,
  FlexBox,
  GridLineIcon,
  Navbar,
  StickyHeader,
  Text,
} from '@titicaca/kint5-core-elements'
import Popup from '@titicaca/popup'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import { useTranslation } from '@titicaca/next-i18next'

import { PoiImageGrid } from './poi-image-grid'

type ImagesPopupProps = Parameters<typeof ImageCarousel>[0] & {
  images: CarouselImageMeta[]
  onFetchMoreImages: () => void
}

export const POI_IMAGES_POPUP_HASH = 'hash.popup.poi-images'

export function PoiImagesPopup({
  images,
  currentPage,
  setCurrentPage,
  displayedTotalCount,
  onFetchMoreImages,
  ...imageCarouselProps
}: ImagesPopupProps) {
  const { t } = useTranslation('common-web')
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  const [renderMediaGrid, setRenderMediaGrid] = useState(false)

  const numOfImages = images.length
  const shouldOpen = uriHash === POI_IMAGES_POPUP_HASH

  const handleMediaGridClick = (clickedMediaIndex: number) => {
    setCurrentPage(clickedMediaIndex)
    setRenderMediaGrid(false)
  }

  const handleOnClose = () => {
    setRenderMediaGrid(false)
    back()
  }

  return (
    <Popup open={shouldOpen} onClose={handleOnClose} noNavbar>
      <StickyHeader>
        <Navbar
          onLeftButtonClick={handleOnClose}
          leftButtonIconType="close"
          centerContent={
            currentPage !== undefined ? (
              <FlexBox flex alignItems="center">
                <Text>
                  {renderMediaGrid ? t(['sajin', '사진']) : currentPage + 1}
                  &nbsp;
                </Text>
                <Text css={{ color: 'var(--color-kint5-gray40)' }}>
                  {renderMediaGrid ? '' : '/ '}
                  {displayedTotalCount}
                </Text>
              </FlexBox>
            ) : null
          }
          rightContent={
            !renderMediaGrid && numOfImages > 1 ? (
              <button onClick={() => setRenderMediaGrid(true)}>
                <GridLineIcon />
              </button>
            ) : null
          }
        />
      </StickyHeader>

      {renderMediaGrid ? (
        <PoiImageGrid
          images={images}
          onMediaClick={handleMediaGridClick}
          onFetchMoreImages={onFetchMoreImages}
        />
      ) : (
        <Container
          css={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            width: '100%',
          }}
        >
          <ImageCarousel
            images={images}
            {...{
              ...imageCarouselProps,
              defaultIndex: currentPage,
            }}
          />
        </Container>
      )}
    </Popup>
  )
}
