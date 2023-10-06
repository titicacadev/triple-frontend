import { useState } from 'react'
import { LayeringMixinProps } from '@titicaca/core-elements'

import { BottomFixedContainer } from './elements'
import ImageBanner from './image-banner'
import TextBanner from './text-banner'

interface AppInstallationCtaProps {
  imgUrl: string
  installUrl: string
  message: string
}

/**
 * @deprecated 구체적인 형태의 컴포넌트인 BannerCTA를 사용하세요
 */
export default function AppInstallationCta({
  imgUrl,
  installUrl,
  message,
}: AppInstallationCtaProps & LayeringMixinProps) {
  const [isImageBannerOpen, setIsImageBannerOpen] = useState(true)

  if (isImageBannerOpen) {
    return (
      <BottomFixedContainer>
        <ImageBanner
          imgUrl={imgUrl}
          installUrl={installUrl}
          onDismiss={() => setIsImageBannerOpen(false)}
        />
      </BottomFixedContainer>
    )
  }

  return <TextBanner message={message} installUrl={installUrl} />
}
