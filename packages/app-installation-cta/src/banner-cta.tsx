import React, { useState, useEffect } from 'react'

import { Overlay, BottomFixedContainer } from './elements'
import ImageBanner from './image-banner'
import TextBanner from './text-banner'

interface BannerCTAProps {
  inventoryId: string
  installUrl: string
  onDismiss?: () => void
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
  onDismiss,
}: BannerCTAProps) {
  const [{ image, desc }, setCTAImage] = useState({ image: '', desc: '' })
  const [isImageBannerOpen, setIsImageBannerOpen] = useState(true)

  useEffect(() => {
    async function fetchCTAImage() {
      const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
        credentials: 'same-origin',
      })

      if (response.ok) {
        const { items } = await response.json()

        if (items.length > 0) {
          const item = items[0]

          setCTAImage({
            image: item.image ? item.image.replace(/\.jpg$/, '.png') : '',
            desc: item.desc,
          })
        }
      }
    }
    fetchCTAImage()
  }, [inventoryId])

  if (isImageBannerOpen) {
    return (
      <Overlay>
        <BottomFixedContainer>
          <ImageBanner
            imgUrl={image}
            installUrl={installUrl}
            onDismiss={() => {
              setIsImageBannerOpen(false)
              onDismiss && onDismiss()
            }}
          />
        </BottomFixedContainer>
      </Overlay>
    )
  }

  return <TextBanner message={desc} installUrl={installUrl} />
}
