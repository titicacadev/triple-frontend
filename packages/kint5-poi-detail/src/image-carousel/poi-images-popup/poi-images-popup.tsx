import { useState } from 'react'
import ImageCarousel, { CarouselImageMeta } from '@titicaca/image-carousel'
import {
  Container,
  FlexBox,
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
}

export const POI_IMAGES_POPUP_HASH = 'hash.popup.poi-images'
export const HASH_EXTRA_INFO_SPLIT_STRING = '+'

export function PoiImagesPopup({
  images,
  currentPage,
  setCurrentPage,
  ...imageCarouselProps
}: ImagesPopupProps) {
  const { t } = useTranslation('common-web')
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  const [renderMediaGrid, setRenderMediaGrid] = useState(false)

  const numOfImages = images.length
  const shouldOpen = uriHash.includes(POI_IMAGES_POPUP_HASH)

  const handleMediaGridClick = (clickedMediaIndex: number) => {
    setCurrentPage(clickedMediaIndex)
    setRenderMediaGrid(false)
  }

  return (
    <Popup open={shouldOpen} onClose={back} noNavbar>
      <StickyHeader>
        <Navbar
          onLeftButtonClick={back}
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
                  {numOfImages}
                </Text>
              </FlexBox>
            ) : null
          }
          rightContent={
            !renderMediaGrid && numOfImages > 1 ? (
              <button onClick={() => setRenderMediaGrid(true)}>
                <img
                  src="https://assets.triple.guide/images/btn-end-view-all@3x.png"
                  alt="View all"
                  width={34}
                  height={34}
                />
              </button>
            ) : null
          }
        />
      </StickyHeader>

      {renderMediaGrid ? (
        <PoiImageGrid images={images} onMediaClick={handleMediaGridClick} />
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
