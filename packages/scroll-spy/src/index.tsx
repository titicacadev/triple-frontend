import {
  useRef,
  useEffect,
  useContext,
  PropsWithChildren,
  createContext,
} from 'react'
import IntersectionObserver from '@titicaca/intersection-observer'
import { useWindowSize } from 'react-use'
import { useScrollToElement } from '@titicaca/react-hooks'

interface ScrollSpyProps {
  generateScrollSpyIntersectionChangeHandler: (
    typeId: string,
  ) => (entry: IntersectionObserverEntry) => void
  scrollOffset: number
}

const ScrollSpyContext = createContext<ScrollSpyProps | null>(null)

export function ScrollSpyContainer({
  activeId,
  scrollOffset = 0,
  preventInitialScroll,
  children,
  onChange,
}: PropsWithChildren<{
  /**
   * ScrollSpyEntity의 사용되는 값으로 ScrollSpyContainer의 children에 대한 각각의 id 값
   */
  activeId: string | null
  /**
   * 해당 child의 위치를 기준으로 제외해야 할 값 (부모 컴포넌트의 padding, margin 등)
   */
  scrollOffset?: number
  /**
   * true일 때 스크롤을 방지하는 값
   */
  preventInitialScroll?: boolean
  /**
   * activeId를 변경하는 핸들러
   */
  onChange: (id: string) => void
}>) {
  const { isScrolling, scrollToElement } = useScrollToElement()
  const activeRef = useRef(activeId)

  const generateScrollSpyIntersectionChangeHandler = (
    typeId: string,
  ): ((entry: IntersectionObserverEntry) => void) => {
    return ({ isIntersecting }) => {
      if (isIntersecting && !isScrolling()) {
        onChange(typeId)
        activeRef.current = typeId
      }
    }
  }

  useEffect(() => {
    const cachedActiveTypeId = activeRef.current

    if (!activeId || activeId === cachedActiveTypeId || preventInitialScroll) {
      return
    }

    scrollToElement(document.getElementById(activeId), {
      offset: -1 * scrollOffset,
      duration: 600,
    })

    activeRef.current = activeId
  }, [activeId, preventInitialScroll, scrollOffset, scrollToElement])

  return (
    <ScrollSpyContext.Provider
      value={{ generateScrollSpyIntersectionChangeHandler, scrollOffset }}
    >
      {children}
    </ScrollSpyContext.Provider>
  )
}

export function ScrollSpyEntity({
  id,
  children,
}: PropsWithChildren<{
  /**
   * ScrollSpyContainer의 activeId의 사용되는 id 값
   */
  id: string
}>) {
  const { height } = useWindowSize()

  const scrollSpy = useContext(ScrollSpyContext)

  if (scrollSpy === null) {
    return <>{children}</>
  }

  const { scrollOffset, generateScrollSpyIntersectionChangeHandler } = scrollSpy

  const rootMargin = `${scrollOffset * -1}px 0px ${
    (height - scrollOffset) * -1
  }px 0px`

  return (
    <IntersectionObserver
      rootMargin={rootMargin}
      onChange={generateScrollSpyIntersectionChangeHandler(id)}
    >
      <div id={id}>{children}</div>
    </IntersectionObserver>
  )
}
