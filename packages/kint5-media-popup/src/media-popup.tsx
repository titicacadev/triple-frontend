import { useState } from 'react'
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
import { Ratio } from '@titicaca/type-definitions'

import { MediaPopupCarousel } from './carousel'
import { MediumMeta } from './types'
import { GridView } from './grid-view'

interface MediaPopupProps {
  media: MediumMeta[]
  open?: boolean
  initialMediaIndex?: number
  frame?: Ratio
  onClose?: () => void
  onMediumChange?: (selectedMediumIndex: number) => void
  onMediumClick?: () => void
}

export const MEDIA_POPUP_HASH = 'hash.media-popup'

export function MediaPopup({
  open,
  media,
  initialMediaIndex = 0,
  frame = '1:1',
  onClose,
  onMediumChange,
  onMediumClick,
}: MediaPopupProps) {
  const { t } = useTranslation('common-web')
  const { back } = useHistoryFunctions()

  const uriHash = useUriHash()
  const [renderMediaGrid, setRenderMediaGrid] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(initialMediaIndex)

  const numOfImages = media.length

  const handleMediaGridClick = (clickedMediumIndex: number) => {
    onMediumChange?.(clickedMediumIndex)
    setCurrentMediaIndex(clickedMediumIndex)
    setRenderMediaGrid(false)
  }

  const handleOnClose = () => {
    setRenderMediaGrid(false)
    onClose ? onClose() : back()
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
            <FlexBox flex alignItems="center">
              <Text>
                {renderMediaGrid ? t(['sajin', '사진']) : currentMediaIndex + 1}
                &nbsp;
              </Text>
              <Text css={{ color: 'var(--color-kint5-gray40)' }}>
                {renderMediaGrid ? '' : '/ '}
                {numOfImages}
              </Text>
            </FlexBox>
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
        <MediaPopupCarousel
          media={media}
          currentMediaIndex={currentMediaIndex}
          frame={frame}
          onSlide={(mediaIndex) => {
            setCurrentMediaIndex(mediaIndex)
            onMediumChange?.(mediaIndex)
          }}
          onMediumClick={onMediumClick}
        />
      )}
    </Popup>
  )
}
