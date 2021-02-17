import React, { useState, useEffect } from 'react'
import { LayeringMixinProps } from '@titicaca/core-elements'
import { InventoryMeta } from '@titicaca/type-definitions'

import { Overlay, BottomFixedContainer } from './elements'
import ImageBanner from './image-banner'
import TextBanner from './text-banner'
import { CTAProps } from './interfaces'
import { fetchInventoryCTA } from './service'
interface BannerCTAProps extends CTAProps {
  inventoryId: string
  installUrl: string
}

/**
 * 이미지가 포함된 배너를 띄우고 dismiss 시에는 텍스트 배너로 바뀌는 CTA 컴포넌트
 *
 * @param inventoryId 표시할 이미지의 인벤토리 ID
 * @param installUrl 앱 설치 URL
 */
export default function BannerCTA({
  inventoryId,
  installUrl,
  onShow,
  onClick,
  onDismiss,
  zTier,
  zIndex,
}: BannerCTAProps & LayeringMixinProps) {
  const [inventoryItem, setInventoryItem] = useState<InventoryMeta>()
  const [isImageBannerOpen, setIsImageBannerOpen] = useState(true)
  const { image = '', desc = '' } = inventoryItem || {}

  useEffect(() => {
    async function fetchCTAImage() {
      const items = await fetchInventoryCTA({ inventoryId })

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
    fetchCTAImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryId])

  return inventoryItem ? (
    isImageBannerOpen && image ? (
      <Overlay zTier={zTier} zIndex={zIndex}>
        <BottomFixedContainer>
          <ImageBanner
            imgUrl={image}
            installUrl={installUrl}
            onShow={onShow}
            onClick={onClick}
            onDismiss={() => {
              setIsImageBannerOpen(false)
              onDismiss && onDismiss(inventoryItem)
            }}
          />
        </BottomFixedContainer>
      </Overlay>
    ) : (
      <TextBanner
        message={desc}
        installUrl={installUrl}
        onShow={onShow}
        onClick={onClick}
      />
    )
  ) : null
}
