import { SyntheticEvent, useCallback, useEffect, useMemo } from 'react'

import {
  ImageBannerWrapper,
  ImageWrapper,
  BannerImage,
  InstallLink,
  DismissButton,
} from './elements'
import { CtaProps } from './interfaces'

interface ImageBannerProps extends CtaProps {
  imgUrl?: string
  installUrl: string
  installText?: string
  dismissText?: string
}

function ImageBanner({
  imgUrl,
  installUrl,
  installText = '편하게 앱에서 보기',
  dismissText = '아깝지만 나중에 받을게요',
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
    (e: SyntheticEvent) => {
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
        <span role="img" aria-label="eyes">
          👀
        </span>
        <span>&nbsp;&nbsp;{installText}</span>
      </InstallLink>

      <DismissButton onClick={handleDismiss}>{dismissText}</DismissButton>
    </ImageBannerWrapper>
  )
}

export default ImageBanner
