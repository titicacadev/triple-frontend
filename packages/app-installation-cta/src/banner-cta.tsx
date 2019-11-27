import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

import ImageBanner from './image-banner'
import TextBanner from './text-banner'

interface BannerCTAProps {
  inventoryId: string
  installUrl: string
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: rgba(58, 58, 58, 0.5);
  z-index: 10;
`

const BottomFixedContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 11;

  > * {
    margin: 0 auto;
  }
`

/**
 * 이미지가 포함된 배너를 띄우고 dismiss 시에는 텍스트 배너로 바뀌는 CTA 컴포넌트
 *
 * @param inventoryId 표시할 이미지의 인벤토리 ID
 * @param installUrl 앱 설치 URL
 */
const BannerCTA: FC<BannerCTAProps> = ({ inventoryId, installUrl }) => {
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
            onDismiss={() => setIsImageBannerOpen(false)}
          />
        </BottomFixedContainer>
      </Overlay>
    )
  }

  return <TextBanner message={desc} installUrl={installUrl} />
}

export default BannerCTA
