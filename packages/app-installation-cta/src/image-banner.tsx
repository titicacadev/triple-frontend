import React, { useCallback, useEffect } from 'react'

import {
  ImageBannerWrapper,
  ImageWrapper,
  BannerImage,
  InstallLink,
  DismissButton,
} from './elements'
import { EventTrackingProps } from './interfaces'

interface ImageBannerProps extends EventTrackingProps {
  imgUrl?: string
  installUrl: string
  onDismiss: () => void
}

export default function ImageBanner({
  imgUrl,
  installUrl,
  onDismiss,
  trackEvent,
  trackEventParams,
}: ImageBannerProps) {
  const imgSrc =
    (imgUrl ?? '').trim() ||
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  const sendTrackEventRequest = useCallback(
    (param) => {
      trackEvent && param && trackEvent(param)
    },
    [trackEvent],
  )

  useEffect(() => {
    sendTrackEventRequest(trackEventParams && trackEventParams.onShow)
  }, [sendTrackEventRequest, trackEventParams])

  const handleClick = useCallback(() => {
    sendTrackEventRequest(trackEventParams && trackEventParams.onSelect)
  }, [sendTrackEventRequest, trackEventParams])

  const handleDismiss = useCallback(() => {
    onDismiss()
    sendTrackEventRequest(trackEventParams && trackEventParams.onDismiss)
  }, [onDismiss, sendTrackEventRequest, trackEventParams])

  return (
    <ImageBannerWrapper>
      <ImageWrapper>
        <BannerImage src={imgSrc} />
      </ImageWrapper>

      <InstallLink href={installUrl} onClick={handleClick}>
        👀&nbsp;&nbsp;편하게 앱에서 보기
      </InstallLink>

      <DismissButton onClick={handleDismiss}>
        아깝지만 나중에 받을게요
      </DismissButton>
    </ImageBannerWrapper>
  )
}
