/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Text,
  MarginPadding,
  LayeringMixinProps,
  Container,
} from '@titicaca/tds-ui'
import { CSSTransition } from 'react-transition-group'
import { useSessionStorage } from '@titicaca/react-hooks'

import {
  BannerExitStrategy,
  EVENT_CHATBOT_CTA_READY,
  FLOATING_BUTTON_CLOSED_STORAGE_KEY,
} from './constants'
import { CtaProps } from './interfaces'
import {
  FloatingButtonContainer,
  InstallAnchor,
  GoAppButton,
  CloseButton,
  FloatingButton,
} from './elements'

interface FloatingButtonCtaProps extends CtaProps {
  exitStrategy?: BannerExitStrategy
  fixed?: boolean
  appInstallLink?: string
  title?: string
  description?: string
  margin?: MarginPadding
  trackEvent?: any
  trackEventParams?: any
  unmountOnExit?: boolean
}

/**
 * '트리플 앱 설치하기' 하단 플로팅 버튼 CTA
 *
 * @param exitStrategy 이 버튼 컴포넌트가 사라져야하는 조건 또는 전략 (기본값 NONE)
 * @param fixed 스크롤 위치와 관계없이 fixed position 인지의 여부
 * @param appInstallLink 앱 설치 URL
 * @param title 앱 설치 안내 문구 제목
 * @param description 앱 설치 안내 문구 설명
 * @param trackEvent 이벤트 트래킹 함수
 * @param margin 버튼 주변 margin 값 (optional)
 * @param trackEventParams GA/FA 수집 파라미터
 * @param unmountOnExit 버튼이 표시되지 않을 때 컴포넌트 마운트 해제 여부
 */
export function FloatingButtonCta({
  exitStrategy = BannerExitStrategy.NONE,
  fixed,
  appInstallLink,
  title = '트리플 앱 설치하기',
  description = '가이드북, 일정짜기, 길찾기, 맛집',
  margin,
  trackEvent,
  trackEventParams,
  onShow,
  onClick,
  onDismiss,
  zTier,
  zIndex,
  unmountOnExit,
}: FloatingButtonCtaProps & LayeringMixinProps) {
  const [buttonVisibility, setButtonVisibility] = useState(false)
  const [available, setAvailable] = useState(true)
  const floatingButtonContainerRef = useRef<HTMLDivElement>(null)
  const sendTrackEventRequest = useCallback(
    (param: any) => {
      trackEvent && param && trackEvent(param)
    },
    [trackEvent],
  )
  const [visitedPages, setVisitedPages] = useSessionStorage(
    FLOATING_BUTTON_CLOSED_STORAGE_KEY,
  )
  useEffect(() => {
    if (visitedPages === 'true') {
      return
    }
    setButtonVisibility(true)
  }, [visitedPages])
  useEffect(() => {
    if (buttonVisibility) {
      sendTrackEventRequest(trackEventParams && trackEventParams.onShow)
      onShow && onShow()
    }
  }, [buttonVisibility, onShow, sendTrackEventRequest, trackEventParams])
  const handleClick = useCallback(() => {
    sendTrackEventRequest(trackEventParams && trackEventParams.onSelect)
    onClick && onClick()
    return true
  }, [onClick, sendTrackEventRequest, trackEventParams])
  const handleDismiss = useCallback(() => {
    setButtonVisibility(false)
    sendTrackEventRequest(trackEventParams && trackEventParams.onClose)
    onDismiss && onDismiss()
    setVisitedPages('true')
  }, [onDismiss, sendTrackEventRequest, setVisitedPages, trackEventParams])
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
    <CSSTransition
      nodeRef={floatingButtonContainerRef}
      in={available}
      appear
      classNames="floating-button-slide"
      timeout={500}
      mountOnEnter={unmountOnExit}
      unmountOnExit={unmountOnExit}
    >
      <FloatingButtonContainer
        ref={floatingButtonContainerRef}
        visibility={buttonVisibility ? 1 : 0}
        fixed={fixed ? 1 : 0}
        margin={margin}
        zTier={zTier}
        zIndex={zIndex}
      >
        <FloatingButton>
          <Container css={{ width: '100%' }}>
            <InstallAnchor href={appInstallLink} onClick={handleClick}>
              <Text size={18} lineHeight="21px" bold color="white">
                <Text floated="left" color="white">
                  {title}
                </Text>
                <GoAppButton src="https://assets.triple.guide/images/ico-arrow@4x.png" />
              </Text>
              <Text
                size={12}
                lineHeight="15px"
                color="white600"
                margin={{ top: 3 }}
              >
                {description}
              </Text>
            </InstallAnchor>
          </Container>
          <Container css={{ width: 46 }} onClick={handleDismiss}>
            <CloseButton src="https://assets.triple.guide/images/btn-closebanner@3x.png" />
          </Container>
        </FloatingButton>
      </FloatingButtonContainer>
    </CSSTransition>
  )
}
