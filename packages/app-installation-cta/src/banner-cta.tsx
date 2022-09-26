import { useState, useEffect } from 'react'
import { LayeringMixinProps } from '@titicaca/core-elements'
import { InventoryItemMeta } from '@titicaca/type-definitions'

import { Overlay, BottomFixedContainer } from './elements'
import ImageBanner from './image-banner'
import TextBanner from './text-banner'
import { CtaProps } from './interfaces'
import { fetchInventoryItems } from './service'

interface BannerCtaProps extends CtaProps {
  inventoryId: string
  installUrl: string
  installText?: string
  dismissText?: string
  disableTextBanner?: boolean
}

/**
 * 이미지가 포함된 배너를 띄우고 dismiss 시에는 텍스트 배너로 바뀌는 CTA 컴포넌트
 *
 * @param inventoryId 표시할 이미지의 인벤토리 ID
 * @param installUrl 앱 설치 URL
 */
export default function BannerCta({
  inventoryId,
  installUrl,
  onShow,
  onClick,
  onDismiss,
  installText,
  dismissText,
  disableTextBanner,
  zTier,
  zIndex,
}: BannerCtaProps & LayeringMixinProps) {
  const [inventoryItem, setInventoryItem] = useState<InventoryItemMeta>()
  const [isImageBannerOpen, setIsImageBannerOpen] = useState(true)
  const { image = '', desc = '' } = inventoryItem || {}

  useEffect(() => {
    async function fetchCtaImage() {
      const items = await fetchInventoryItems({ inventoryId })

      if (items) {
        if (items.length > 0) {
          const item = items[0]

          setInventoryItem({
            image: item.image ? item.image.replace(/\.jpg$/, '.png') : '',
            desc: item.desc,
          })
        } else {
          onDismiss && onDismiss()
        }
      }
    }
    fetchCtaImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryId])

  return inventoryItem ? (
    isImageBannerOpen && image ? (
      <Overlay
        zTier={zTier}
        zIndex={zIndex}
        onClick={() => {
          setIsImageBannerOpen(false)
          onDismiss && onDismiss(inventoryItem)
        }}
      >
        <BottomFixedContainer>
          <ImageBanner
            imgUrl={image}
            installUrl={installUrl}
            installText={installText}
            dismissText={dismissText}
            onShow={onShow}
            onClick={onClick}
            onDismiss={() => {
              setIsImageBannerOpen(false)
              onDismiss && onDismiss(inventoryItem)
            }}
          />
        </BottomFixedContainer>
      </Overlay>
    ) : !disableTextBanner ? (
      <TextBanner
        message={desc}
        installUrl={installUrl}
        onShow={onShow}
        onClick={onClick}
      />
    ) : null
  ) : null
}
