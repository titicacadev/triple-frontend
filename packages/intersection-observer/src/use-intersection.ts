import { useState, useEffect, useCallback, useRef } from 'react'

const useIntersection = ({ threshold }: { threshold?: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersection, setIsIntersection] = useState(false)

  const handleScroll = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsIntersection(true)
    }
  }, [])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(handleScroll, {
      threshold: threshold ?? 0,
    })

    return () => observer && observer.disconnect()
  }, [ref, threshold, handleScroll])

  return {
    ref,
    isIntersection,
  }
}

export default useIntersection
