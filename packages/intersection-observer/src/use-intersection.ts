import { useState, useEffect, useRef } from 'react'

export default function useIntersection({
  threshold,
  rootMargin,
}: {
  threshold?: number
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    function handleScroll([entry]: any) {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
      }
    }

    const observer = new IntersectionObserver(handleScroll, {
      threshold: threshold ?? 0,
      rootMargin: rootMargin ?? '0px',
    })

    return () => observer && observer.disconnect()
  }, [ref, threshold, rootMargin])

  return {
    ref,
    isIntersecting,
  }
}
