import React from 'react'

import { TextBannerWrapper, DownloadIcon } from './elements'

interface TextBannerProps {
  message: string
  installUrl: string
}

export default function TextBanner({ message, installUrl }: TextBannerProps) {
  return (
    <TextBannerWrapper href={installUrl}>
      {message}
      <DownloadIcon src="https://assets.triple.guide/images/m-banner-top-dw@3x.png" />
    </TextBannerWrapper>
  )
}
