import React, { useState, useEffect } from 'react'

import { Overlay, BottomFixedContainer } from './elements'
import ImageBanner from './image-banner'
import TextBanner from './text-banner'
import { EventTrackingProps } from './interfaces'

type CTAImage = {
  image?: string
  desc?: string
}

interface BannerCTAProps extends EventTrackingProps {
  inventoryId: string
  installUrl: string
  onDismiss?: (ctaImage?: CTAImage) => void
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
  trackEvent,
  trackEventParams,
}: BannerCTAProps) {
  const [ctaImage, setCTAImage] = useState<CTAImage>()
  const [isImageBannerOpen, setIsImageBannerOpen] = useState(false)
  const { image = '', desc = '' } = ctaImage || {}

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
        } else {
          onDismiss && onDismiss()
        }
      }
    }
    fetchCTAImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryId])

  useEffect(() => {
    setIsImageBannerOpen(!!ctaImage?.image)
  }, [ctaImage])

  if (isImageBannerOpen) {
    return image ? (
      <Overlay>
        <BottomFixedContainer>
          <ImageBanner
            imgUrl={image}
            installUrl={installUrl}
            onDismiss={() => {
              setIsImageBannerOpen(false)
              onDismiss && onDismiss(ctaImage)
            }}
            trackEvent={trackEvent}
            trackEventParams={trackEventParams}
          />
        </BottomFixedContainer>
      </Overlay>
    ) : null
  }

  return desc ? (
    <TextBanner
      message={desc}
      installUrl={installUrl}
      trackEvent={trackEvent}
      trackEventParams={trackEventParams}
    />
  ) : null
}
