'use client'

import { useState } from 'react'
import { Controller } from 'swiper/modules'
import { useTranslation } from '@titicaca/next-i18next'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import {
  FlexBox,
  GridLineIcon,
  Navbar,
  StickyHeader,
  Text,
} from '@titicaca/kint5-core-elements'
import { Popup } from '@titicaca/kint5-popup'
import { MediaCarousel } from '@titicaca/kint5-media-carousel'

import { MediumMeta } from './types'
import { GridView } from './grid-view'

interface MediaPopupProps {
  media: MediumMeta[]
  open?: boolean
  initialMediaIndex?: number
  onMediumChange?: (selectedMediumIndex: number) => void
}

export const MEDIA_POPUP_HASH = 'hash.media-popup'

export function MediaPopup({
  open,
  media,
  initialMediaIndex = 0,
  onMediumChange,
}: MediaPopupProps) {
  const { t } = useTranslation('common-web')
  const { back } = useHistoryFunctions()

  const uriHash = useUriHash()
  const [renderMediaGrid, setRenderMediaGrid] = useState(false)

  const numOfImages = media.length

  const handleMediaGridClick = (clickedMediaIndex: number) => {
    onMediumChange?.(clickedMediaIndex)
    setRenderMediaGrid(false)
  }

  const handleOnClose = () => {
    setRenderMediaGrid(false)
    back()
  }

  return (
    <Popup
      open={open ?? uriHash === MEDIA_POPUP_HASH}
      onClose={handleOnClose}
      noNavbar
    >
      <StickyHeader>
        <Navbar
          onLeftButtonClick={handleOnClose}
          leftButtonIconType="close"
          centerContent={
            initialMediaIndex !== null ? (
              <FlexBox flex alignItems="center">
                <Text>
                  {renderMediaGrid ? t('사진') : initialMediaIndex + 1}
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
              <button
                onClick={() => setRenderMediaGrid(true)}
                aria-label="View all images"
              >
                <GridLineIcon />
              </button>
            ) : null
          }
        />
      </StickyHeader>
      {renderMediaGrid ? (
        <GridView media={media} onMediumClick={handleMediaGridClick} />
      ) : (
        <div
          css={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
          }}
        >
          <MediaCarousel
            modules={[Controller]}
            noPageLabel
            media={media}
            frame="1:1"
            initialSlide={initialMediaIndex}
            onSlideChange={({ activeIndex }: { activeIndex: number }) => {
              onMediumChange?.(activeIndex)
            }}
          />
        </div>
      )}
    </Popup>
  )
}
