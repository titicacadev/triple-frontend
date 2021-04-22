import 'intersection-observer'
import { useState, useEffect, useRef, MutableRefObject } from 'react'

export default function useIntersection<T>({
  threshold,
  rootMargin,
}: {
  threshold?: number
  rootMargin?: number
}) {
  const ref: MutableRefObject<T | null> = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    function handleScroll([entry]: IntersectionObserverEntry[]) {
      setIsIntersecting(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(handleScroll, {
      threshold: threshold ?? 0,
      rootMargin: rootMargin ? `${rootMargin}px` : '0px',
    })

    return () => observer && observer.disconnect()
  }, [ref, threshold, rootMargin])

  return {
    ref,
    isIntersecting,
  }
}
