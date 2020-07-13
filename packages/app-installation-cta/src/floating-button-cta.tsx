import React, { useState, useCallback, useEffect } from 'react'
import { Text, MarginPadding } from '@titicaca/core-elements'
import { CSSTransition } from 'react-transition-group'

import {
  BannerExitStrategy,
  EVENT_CHATBOT_CTA_READY,
  FLOATING_BUTTON_CLOSED_STORAGE_KEY,
} from './constants'
import { EventTrackingProps } from './interfaces'
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

interface FloatingButtonCTAProps extends EventTrackingProps {
  exitStrategy?: BannerExitStrategy
  fixed?: boolean
  appInstallLink?: string
  description?: string
  margin?: MarginPadding
}

/**
 * '트리플 앱 설치하기' 하단 플로팅 버튼 CTA
 *
 * @param exitStrategy 이 버튼 컴포넌트가 사라져야하는 조건 또는 전략 (기본값 NONE)
 * @param fixed 스크롤 위치와 관계없이 fixed position 인지의 여부
 * @param appInstallLink 앱 설치 URL
 * @param description 앱 설치 안내문구
 * @param trackEvent 이벤트 트래킹 함수
 * @param margin 버튼 주변 margin 값 (optional)
 * @param trackEventParams GA/FA 수집 파라미터
 */
export default function FloatingButtonCTA({
  exitStrategy = BannerExitStrategy.NONE,
  fixed,
  appInstallLink,
  description = '가이드북, 일정짜기, 길찾기, 맛집',
  margin,
  trackEvent,
  trackEventParams,
}: FloatingButtonCTAProps) {
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
