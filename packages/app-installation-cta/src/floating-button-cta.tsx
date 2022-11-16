/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Text,
  MarginPadding,
  LayeringMixinProps,
  Container,
} from '@titicaca/core-elements'
import { CSSTransition } from 'react-transition-group'
import { getWebStorage } from '@titicaca/web-storage'

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
  ContentContainer,
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
 * '트리플 앱 설치하기' 하단 플로팅 버튼 CTA - 리뉴얼 디자인
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
export default function FloatingButtonCtaV2({
  exitStrategy = BannerExitStrategy.NONE,
  fixed,
  appInstallLink,
  title = '내 여행 동선, 한눈에 보고 싶다면?',
  description = '780만이 선택한 트리플에서 일정 짜기',
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
    (param) => {
      trackEvent && param && trackEvent(param)
    },
    [trackEvent],
  )

  useEffect(() => {
    let visitedPages = false

    try {
      const storage = getWebStorage('sessionStorage')
      visitedPages = !!storage.getItem(FLOATING_BUTTON_CLOSED_STORAGE_KEY)
    } catch (error) {
      // 사용자가 이전에 CTA를 닫았었는지 확인합니다.
      // 필수적인 기능이 아니므로 에러를 조용히 넘깁니다.
    }

    if (!visitedPages && !buttonVisibility) {
      setButtonVisibility(true)
    }
  }, [buttonVisibility])

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

    try {
      const storage = getWebStorage('sessionStorage')
      storage.setItem(FLOATING_BUTTON_CLOSED_STORAGE_KEY, 'true')
    } catch (error) {
      // 사용자가 CTA를 닫았다는 것을 기록합니다.
      // 필수적인 기능이 아니므로 에러를 조용히 넘깁니다.
    }
  }, [onDismiss, sendTrackEventRequest, trackEventParams])

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
        <ContentContainer>
          <img
            src="https://assets.triple.guide/images/img_app_icon_white@4x.png"
            alt="icon-app-download"
            width={42}
            height={42}
          />
          <InstallAnchor href={appInstallLink} onClick={handleClick}>
            <Text
              size={16}
              bold
              lineHeight="19px"
              color="white"
              letterSpacing={-0.5}
            >
              {title}
            </Text>

            <Text
              inlineBlock
              size={13}
              lineHeight="16px"
              color="white"
              alpha={0.8}
              letterSpacing={-0.5}
            >
              {description}
            </Text>

            <GoAppButton
              src="https://assets.triple.guide/images/img_arrow_right_12@4x.png"
              alt="icon-right-arrow"
              width={6}
              height={12}
            />
          </InstallAnchor>
          <Container
            position="absolute"
            positioning={{ top: 4, right: 4 }}
            width={32}
            height={32}
            onClick={handleDismiss}
          >
            <CloseButton
              src="https://assets.triple.guide/images/img_delete_12@4x.png"
              alt="icon-close-button"
              width={12}
              height={12}
            />
          </Container>
        </ContentContainer>
      </FloatingButtonContainer>
    </CSSTransition>
  )
}
