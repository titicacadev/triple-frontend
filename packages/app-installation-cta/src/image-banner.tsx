import { useCallback, useEffect, useMemo } from 'react'

import {
  ImageBannerWrapper,
  ImageWrapper,
  BannerImage,
  InstallLink,
  DismissButton,
} from './elements'
import { CTAProps } from './interfaces'

interface ImageBannerProps extends CTAProps {
  imgUrl?: string
  installUrl: string
  installText?: string
  dismissText?: string
}

export default function ImageBanner({
  imgUrl,
  installUrl,
  installText,
  dismissText,
  onShow,
  onClick,
  onDismiss,
}: ImageBannerProps) {
  const imgSrc =
    (imgUrl ?? '').trim() ||
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  const inventoryItem = useMemo(
    () => (imgUrl ? { image: imgUrl } : undefined),
    [imgUrl],
  )

  useEffect(() => {
    onShow && onShow(inventoryItem)
  }, [onShow, inventoryItem])

  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation()
      onClick && onClick(inventoryItem)
    },
    [onClick, inventoryItem],
  )

  const handleDismiss = useCallback(
    (e) => {
      e.stopPropagation()
      onDismiss && onDismiss(inventoryItem)
    },
    [onDismiss, inventoryItem],
  )

  return (
    <ImageBannerWrapper>
      <ImageWrapper>
        <BannerImage src={imgSrc} />
      </ImageWrapper>

      <InstallLink href={installUrl} onClick={handleClick}>
        👀&nbsp;&nbsp;{installText || '편하게 앱에서 보기'}
      </InstallLink>

      <DismissButton onClick={handleDismiss}>
        {dismissText || '아깝지만 나중에 받을게요'}
      </DismissButton>
    </ImageBannerWrapper>
  )
}
