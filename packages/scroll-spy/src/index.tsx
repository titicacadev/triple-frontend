import React, {
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
  activeId: string | null
  scrollOffset?: number
  preventInitialScroll?: boolean
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
