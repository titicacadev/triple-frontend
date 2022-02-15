import { useCallback, useEffect, useMemo } from 'react';

import { TextBannerWrapper, DownloadIcon } from './elements'
import { CTAProps } from './interfaces'

interface TextBannerProps extends CTAProps {
  message: string
  installUrl: string
}

export default function TextBanner({
  message,
  installUrl,
  onShow,
  onClick,
}: TextBannerProps) {
  const inventoryItem = useMemo(
    () => (message ? { desc: message } : undefined),
    [message],
  )

  useEffect(() => {
    onShow && onShow(inventoryItem)
  }, [onShow, inventoryItem])

  const handleClick = useCallback(() => {
    onClick && onClick(inventoryItem)
  }, [onClick, inventoryItem])

  return (
    <TextBannerWrapper href={installUrl} onClick={handleClick}>
      {message}
      <DownloadIcon src="https://assets.triple.guide/images/m-banner-top-dw@3x.png" />
    </TextBannerWrapper>
  )
}
