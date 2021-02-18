import { useRef, useState, useEffect } from 'react'

export function useVideoRef() {
  const [pending, setPending] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const currentRef = videoRef.current

    const handlePending = () => setPending(true)
    const handleReady = () => setPending(false)

    if (currentRef) {
      currentRef.addEventListener('canplaythrough', handleReady)
      currentRef.addEventListener('canplay', handleReady)
      currentRef.addEventListener('play', handleReady)
      currentRef.addEventListener('waiting', handlePending)

      return () => {
        currentRef.removeEventListener('canplaythrough', handleReady)
        currentRef.removeEventListener('canplay', handleReady)
        currentRef.removeEventListener('play', handleReady)
        currentRef.removeEventListener('waiting', handlePending)
      }
    } else {
      throw new Error('Cannot use Video State')
    }
  }, [])

  return {
    videoRef,
    pending,
  }
}
