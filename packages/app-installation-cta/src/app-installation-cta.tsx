import React, { useState } from 'react'
import { LayeringMixinProps } from '@titicaca/core-elements'

import { Overlay, BottomFixedContainer } from './elements'
import ImageBanner from './image-banner'
import TextBanner from './text-banner'

interface AppInstallationCTAProps {
  imgUrl: string
  installUrl: string
  message: string
}

/**
 * @deprecated 구체적인 형태의 컴포넌트인 BannerCTA를 사용하세요
 */
export default function AppInstallationCTA({
  imgUrl,
  installUrl,
  message,
  zTier,
  zIndex,
}: AppInstallationCTAProps & LayeringMixinProps) {
  const [isImageBannerOpen, setIsImageBannerOpen] = useState(true)

  if (isImageBannerOpen) {
    return (
      <Overlay zTier={zTier} zIndex={zIndex}>
        <BottomFixedContainer>
          <ImageBanner
            imgUrl={imgUrl}
            installUrl={installUrl}
            onDismiss={() => setIsImageBannerOpen(false)}
          />
        </BottomFixedContainer>
      </Overlay>
    )
  }

  return <TextBanner message={message} installUrl={installUrl} />
}
