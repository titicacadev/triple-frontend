import 'intersection-observer'
import { useState, useEffect, useRef } from 'react'

export default function useIntersection<T extends Element>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    function handleScroll([entry]: IntersectionObserverEntry[]) {
      setIsIntersecting(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(handleScroll, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [options])

  return {
    ref,
    isIntersecting,
  }
}
