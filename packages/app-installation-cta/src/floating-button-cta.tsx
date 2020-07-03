import React, { useState, useCallback, useEffect } from 'react'
import { Text, MarginPadding } from '@titicaca/core-elements'
import { CSSTransition } from 'react-transition-group'

import {
  FloatingButton,
  InstallDescription,
  InstallAnchor,
  Description,
  GoAppButton,
  CloseButton,
  LeftContainer,
  RightContainer,
} from './elements'

export const FLOATING_BITTON_CLOSED_STORAGE_KEY = 'close_install_button'
const DEFAULT_DESCRIPTION_TEXT = '가이드북, 일정짜기, 길찾기, 맛집'

export default function FloatingButtonCTA({
  available = true,
  fixed,
  appInstallLink,
  description = DEFAULT_DESCRIPTION_TEXT,
  trackEvent,
  margin,
  trackEventParams,
}: {
  available?: boolean
  fixed?: boolean
  appInstallLink?: string
  description?: string
  trackEvent?: any
  margin?: MarginPadding
  trackEventParams?: {
    onShow?: any
    onSelect?: any
    onClose?: any
  }
}) {
  const [buttonVisibility, setButtonVisibility] = useState(false)

  const sendTrackEventRequest = useCallback(
    (param) => {
      trackEvent && param && trackEvent(param)
    },
    [trackEvent],
  )

  useEffect(() => {
    const visitedPages = window.sessionStorage.getItem(
      FLOATING_BITTON_CLOSED_STORAGE_KEY,
    )
    if (!visitedPages && !buttonVisibility) {
      setButtonVisibility(true)
      sendTrackEventRequest(trackEventParams && trackEventParams.onShow)
    }
  }, [buttonVisibility, sendTrackEventRequest, trackEventParams])

  const onClose = () => {
    setButtonVisibility(false)
    window.sessionStorage.setItem(FLOATING_BITTON_CLOSED_STORAGE_KEY, 'true')
    sendTrackEventRequest(trackEventParams && trackEventParams.onClose)
  }

  const onSelect = () => {
    sendTrackEventRequest(trackEventParams && trackEventParams.onSelect)
    return true
  }

  return (
    <CSSTransition in={available} appear classNames="fade" timeout={500}>
      <FloatingButton
        visibility={buttonVisibility ? 1 : 0}
        fixed={fixed ? 1 : 0}
        margin={margin}
      >
        <LeftContainer>
          <InstallAnchor href={appInstallLink} onClick={onSelect}>
            <InstallDescription>
              <Text floated="left" color="white">
                트리플 앱 설치하기
              </Text>
              <GoAppButton src="https://assets.triple.guide/images/ico-arrow@4x.png" />
            </InstallDescription>
            <Description>{description}</Description>
          </InstallAnchor>
        </LeftContainer>
        <RightContainer onClick={onClose}>
          <CloseButton src="https://assets.triple.guide/images/btn-closebanner@3x.png" />
        </RightContainer>
      </FloatingButton>
    </CSSTransition>
  )
}
