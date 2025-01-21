import { PropsWithChildren, useEffect } from 'react'
import { InView } from 'react-intersection-observer'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { Container } from '@titicaca/core-elements'

import { useScroll } from './scroll-context'

export interface ChatScrollContainerProps {
  onTopIntersecting?: (entry: IntersectionObserverEntry) => void
  onBottomIntersecting?: (entry: IntersectionObserverEntry) => void
  /**
   * ios에서 스크롤 시 실행되는 리스너입니다.
   * 키보드가 내려가도록 closeKeyboard interface를 전달하여 사용할 수 있습니다.
   * ref: https://github.com/titicacadev/triple-chat-web/pull/37
   */
  onIosTouchMove?: () => void
}

/** 
  스크롤이나 페이지네이션 로직을 사용할 수 있는 컨테이너입니다.
  사용하기 위해서는 해당 컴포넌트 상위에 ScrollProvider가 등록되어야 합니다.
*/
export function ChatScrollContainer({
  onTopIntersecting,
  onBottomIntersecting,
  onIosTouchMove,
  children,
  ...props
}: PropsWithChildren<ChatScrollContainerProps>) {
  const { chatContainerRef, scrollContainerRef, bottomRef } = useScroll()
  const { os } = useUserAgentContext()

  useEffect(() => {
    const chatContainerElement = chatContainerRef.current

    if (chatContainerElement && os.name === 'iOS' && onIosTouchMove) {
      chatContainerElement.addEventListener('touchmove', onIosTouchMove)
      return () => {
        chatContainerElement.removeEventListener('touchmove', onIosTouchMove)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container {...props}>
      <Container
        ref={chatContainerRef}
        css={{ height: 'inherit', overflowY: 'scroll' }}
      >
        <InView onChange={(_inView, entry) => onTopIntersecting?.(entry)} />

        <Container ref={scrollContainerRef}>{children}</Container>

        <InView onChange={(_inView, entry) => onBottomIntersecting?.(entry)}>
          <div ref={bottomRef} />
        </InView>
      </Container>
    </Container>
  )
}
