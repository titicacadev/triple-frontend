import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useUserAgentContext } from '@titicaca/react-contexts'

import { MIN_DESKTOP_WIDTH } from './constants'
import { PublicHeader, PublicHeaderProps } from './public-header'

const TRANSITION_TIME = 250
/**
 * 현재 화면 꼭대기의 상대적인 위치를 구합니다.
 *
 * overscroll 되었을 때를 무시하기 위해 scrollTop의 범위는
 * 0 이상, 페이지 길이 - 화면 높이 이하로 제한합니다.
 *
 * @param heightCompensation 동적으로 표시했다 가렸다 하는 엘리먼트의 높이를 보정하는 파라미터
 * @returns
 */
function getScrollTop(heightCompensation: number = 0) {
  const maxScrollTop = document.body.clientHeight - window.innerHeight

  return Math.min(
    Math.max(
      (window.pageYOffset ?? document.documentElement.scrollTop) +
        heightCompensation,
      0,
    ),
    maxScrollTop,
  )
}

interface DirectionLog {
  timeStamp: number
  scrollTop: number
}
type Direction = 'NEUTRAL' | 'UP' | 'DOWN'

function createScrollDirectionDetector(initialLog: DirectionLog) {
  const prevLog: DirectionLog = {
    timeStamp: initialLog.timeStamp,
    scrollTop: initialLog.scrollTop,
  }

  return ({ scrollTop, timeStamp }: DirectionLog): Direction => {
    const scrollVelocity =
      (scrollTop - prevLog.scrollTop) / (timeStamp - prevLog.timeStamp)

    prevLog.scrollTop = scrollTop
    prevLog.timeStamp = timeStamp

    if (scrollVelocity === 0) {
      return 'NEUTRAL'
    }

    return scrollVelocity > 0 ? 'DOWN' : 'UP'
  }
}

const AnimationWrapper = styled.div<{ visible: boolean }>`
  transition: height ease ${TRANSITION_TIME}ms;
  overflow: hidden;
  ${({ visible }) =>
    css`
      height: ${visible ? '51px' : '0px'};
    `}

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    ${({ visible }) =>
      css`
        height: ${visible ? '81px' : '0px'};
      `}
  }

  > header {
    /**
     * HACK: header가 사라질 때 그래픽이 깨지는 문제 때문에 position을 static으로 초기화합니다.
     * 참고: https://github.com/titicacadev/triple-hotels-web/pull/2346#issuecomment-871214559
     * HACK: header의 자식이 absolute position이 적용되어있어 쌓임 맥락이 필요합니다.
     * 그래서 position 대신 transform으로 쌓임 맥락을 만듭니다.
     */
    position: static;
    transform: translate(0);
  }
`

export function AutoHidingPublicHeader(props: PublicHeaderProps) {
  const [publicHeaderVisible, setPublicHeaderVisible] = useState(false)
  const { app } = useUserAgentContext()

  useEffect(() => {
    const detectScrollDirection = createScrollDirectionDetector({
      timeStamp: 0,
      scrollTop: getScrollTop(),
    })

    const headerHeight = window.innerWidth >= MIN_DESKTOP_WIDTH ? 81 : 51
    let lastTimeStamp: number | null = null
    let isVisible = false

    const intervalId = setInterval(() => {
      if (lastTimeStamp) {
        const direction = detectScrollDirection({
          scrollTop: getScrollTop(headerHeight * (isVisible ? -1 : 0)),
          timeStamp: lastTimeStamp,
        })

        if (direction !== 'NEUTRAL') {
          setPublicHeaderVisible(direction === 'UP')
          isVisible = direction === 'UP'
        }

        lastTimeStamp = null
      }
    }, TRANSITION_TIME + 50)

    const handleScroll = (evt: Event) => {
      lastTimeStamp = evt.timeStamp
    }

    window.addEventListener('scroll', handleScroll, {
      capture: false,
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(intervalId)
    }
  }, [])

  if (app) {
    return null
  }

  return (
    <AnimationWrapper visible={publicHeaderVisible}>
      <PublicHeader {...props} />
    </AnimationWrapper>
  )
}
