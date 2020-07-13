import React, { useCallback, useEffect } from 'react'

import { TextBannerWrapper, DownloadIcon } from './elements'
import { EventTrackingProps } from './interfaces'

interface TextBannerProps extends EventTrackingProps {
  message: string
  installUrl: string
}

export default function TextBanner({
  message,
  installUrl,
  trackEvent,
  trackEventParams,
}: TextBannerProps) {
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

  return (
    <TextBannerWrapper href={installUrl} onClick={handleClick}>
      {message}
      <DownloadIcon src="https://assets.triple.guide/images/m-banner-top-dw@3x.png" />
    </TextBannerWrapper>
  )
}
