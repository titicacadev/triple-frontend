import React, { FC, useState } from 'react'
import styled from 'styled-components'

import ImageBanner from './image-banner'
import TextBanner from './text-banner'

interface AppInstallationCTAProps {
  imgUrl: string
  installUrl: string
  message: string
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
 * @deprecated 구체적인 형태의 컴포넌트인 BannerCTA를 사용하세요
 */
const AppInstallationCTA: FC<AppInstallationCTAProps> = ({
  imgUrl,
  installUrl,
  message,
}) => {
  const [isImageBannerOpen, setIsImageBannerOpen] = useState(true)

  if (isImageBannerOpen) {
    return (
      <Overlay>
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

export default AppInstallationCTA
