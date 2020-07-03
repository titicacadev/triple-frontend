import React, { useState, useCallback, useEffect } from 'react'
import { Text, MarginPadding } from '@titicaca/core-elements'
import { CSSTransition } from 'react-transition-group'

import {
  BannerExitStrategy,
  EVENT_CHATBOT_CTA_READY,
  FLOATING_BUTTON_CLOSED_STORAGE_KEY,
} from './constants'
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

export default function FloatingButtonCTA({
  exitStrategy = BannerExitStrategy.NONE,
  fixed,
  appInstallLink,
  description = '가이드북, 일정짜기, 길찾기, 맛집',
  trackEvent,
  margin,
  trackEventParams,
}: {
  exitStrategy?: BannerExitStrategy
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
  const [available, setAvailable] = useState(true)

  const sendTrackEventRequest = useCallback(
    (param) => {
      trackEvent && param && trackEvent(param)
    },
    [trackEvent],
  )

  useEffect(() => {
    const visitedPages = window.sessionStorage.getItem(
      FLOATING_BUTTON_CLOSED_STORAGE_KEY,
    )
    if (!visitedPages && !buttonVisibility) {
      setButtonVisibility(true)
      sendTrackEventRequest(trackEventParams && trackEventParams.onShow)
    }
  }, [buttonVisibility, sendTrackEventRequest, trackEventParams])

  const onClose = () => {
    setButtonVisibility(false)
    window.sessionStorage.setItem(FLOATING_BUTTON_CLOSED_STORAGE_KEY, 'true')
    sendTrackEventRequest(trackEventParams && trackEventParams.onClose)
  }

  const onSelect = () => {
    sendTrackEventRequest(trackEventParams && trackEventParams.onSelect)
    return true
  }

  useEffect(() => {
    if (exitStrategy === BannerExitStrategy.CHATBOT_READY) {
      const onChatbotReady = () => {
        setAvailable(false)
        window.removeEventListener(EVENT_CHATBOT_CTA_READY, onChatbotReady)
      }

      window.addEventListener(EVENT_CHATBOT_CTA_READY, onChatbotReady)

      return () => {
        window.removeEventListener(EVENT_CHATBOT_CTA_READY, onChatbotReady)
      }
    }
  }, [exitStrategy])

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
