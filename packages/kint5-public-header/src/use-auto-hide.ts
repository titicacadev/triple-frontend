import { useEffect, useState } from 'react'

import {
  HEADER_DESKTOP_HEIGHT,
  HEADER_MOBILE_HEIGHT,
  MIN_DESKTOP_WIDTH,
  TRANSITION_TIME,
} from './constants'

export function useAutoHide(disabled = false) {
  const [publicHeaderVisible, setPublicHeaderVisible] = useState(disabled)

  useEffect(() => {
    if (disabled) {
      return
    }

    const detectScrollDirection = createScrollDirectionDetector({
      timeStamp: 0,
      scrollTop: getScrollTop(),
    })

    const headerHeight: number =
      1 +
      (window.innerWidth >= MIN_DESKTOP_WIDTH
        ? HEADER_DESKTOP_HEIGHT
        : HEADER_MOBILE_HEIGHT)
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
  }, [disabled])

  return publicHeaderVisible
}

/**
 * 현재 화면 꼭대기의 상대적인 위치를 구합니다.
 *
 * overscroll 되었을 때를 무시하기 위해 scrollTop의 범위는
 * 0 이상, 페이지 길이 - 화면 높이 이하로 제한합니다.
 *
 * @param heightCompensation 동적으로 표시했다 가렸다 하는 엘리먼트의 높이를 보정하는 파라미터
 * @returns
 */
function getScrollTop(heightCompensation = 0) {
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
