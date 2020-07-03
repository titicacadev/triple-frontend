import React from 'react'

import {
  ImageBannerWrapper,
  ImageWrapper,
  BannerImage,
  InstallLink,
  DismissButton,
} from './elements'

interface ImageBannerProps {
  imgUrl?: string
  installUrl: string
  onDismiss: () => void
}

export default function ImageBanner({
  imgUrl,
  installUrl,
  onDismiss,
}: ImageBannerProps) {
  const imgSrc =
    (imgUrl ?? '').trim() ||
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  return (
    <ImageBannerWrapper>
      <ImageWrapper>
        <BannerImage src={imgSrc} />
      </ImageWrapper>

      <InstallLink href={installUrl}>
        👀&nbsp;&nbsp;편하게 앱에서 보기
      </InstallLink>

      <DismissButton onClick={onDismiss}>
        아깝지만 나중에 받을게요
      </DismissButton>
    </ImageBannerWrapper>
  )
}
