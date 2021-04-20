import { useState, useEffect, useCallback, useRef } from 'react'

const useInterSection = ({ threshold }: { threshold?: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInterSection, setIsInterSection] = useState(false)

  const handleScroll = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsInterSection(true)
    }
  }, [])

  useEffect(() => {
    let observer: any
    const { current } = ref
    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: threshold ?? 0,
      })
      observer.observe(current)

      return () => observer && observer.disconnect()
    }
  }, [ref, threshold, handleScroll])

  return {
    ref,
    isInterSection,
  }
}

export default useInterSection
