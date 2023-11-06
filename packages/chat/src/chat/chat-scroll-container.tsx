import { PropsWithChildren, useEffect } from 'react'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'
import { closeKeyboard } from '@titicaca/triple-web-to-native-interfaces'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { Container } from '@titicaca/core-elements'

import { useScroll } from './scroll-context'

export interface ChatScrollContainerProps {
  onTopIntersecting?: (entry: IntersectionObserverEntry) => void
  onBottomIntersecting?: (entry: IntersectionObserverEntry) => void
}

/** 
  스크롤이나 페이지네이션 로직을 사용할 수 있는 컨테이너입니다.
  사용하기 위해서는 해당 컴포넌트 상위에 ScrollProvider가 등록되어야 합니다.
*/
export function ChatScrollContainer({
  onTopIntersecting,
  onBottomIntersecting,
  children,
  ...props
}: PropsWithChildren<ChatScrollContainerProps>) {
  const { chatContainerRef, scrollContainerRef, bottomRef } = useScroll()
  const { os } = useUserAgentContext()

  useEffect(() => {
    /**
     * ios에서 스크롤 시 키보드가 내려가도록 설정합니다.
     * ref: https://github.com/titicacadev/triple-chat-web/pull/37
     */
    const chatContainerElement = chatContainerRef.current

    if (chatContainerElement && os.name === 'iOS') {
      chatContainerElement.addEventListener('touchmove', closeKeyboard)
      return () => {
        chatContainerElement.removeEventListener('touchmove', closeKeyboard)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container {...props}>
      <Container
        ref={chatContainerRef}
        css={{ height: 'inherit', overflowY: 'scroll' }}
      >
        <StaticIntersectionObserver
          onChange={(entry) => onTopIntersecting?.(entry)}
        >
          <div />
        </StaticIntersectionObserver>

        <Container ref={scrollContainerRef}>{children}</Container>

        <StaticIntersectionObserver
          onChange={(entry) => onBottomIntersecting?.(entry)}
        >
          <div ref={bottomRef} />
        </StaticIntersectionObserver>
      </Container>
    </Container>
  )
}
