import { useRef, useState, useCallback, useEffect } from 'react'

export function useVideoRef() {
  const [pending, setPending] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePending = useCallback(() => setPending(true), [setPending])
  const handleReady = useCallback(() => setPending(false), [setPending])

  useEffect(() => {
    const currentRef = videoRef.current

    if (currentRef) {
      currentRef.addEventListener('canplaythrough', handleReady)
      currentRef.addEventListener('canplay', handleReady)
      currentRef.addEventListener('play', handleReady)
      currentRef.addEventListener('waiting', handlePending)
    } else {
      throw new Error('Cannot use Video State')
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('canplaythrough', handleReady)
        currentRef.removeEventListener('canplay', handleReady)
        currentRef.removeEventListener('play', handleReady)
        currentRef.removeEventListener('waiting', handlePending)
      }
    }
  }, [videoRef, handleReady, handlePending])

  return {
    videoRef,
    pending,
  }
}
