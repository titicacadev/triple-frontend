import { useRef, useState, useEffect } from 'react'

export function useVideoRef() {
  const [pending, setPending] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const currentRef = videoRef.current

    const handlePending = () => setPending(true)
    const handleReady = () => setPending(false)

    if (currentRef) {
      currentRef.addEventListener('canplay', handleReady)
      currentRef.addEventListener('waiting', handlePending)
      currentRef.addEventListener('progress', handlePending)

      return () => {
        currentRef.removeEventListener('canplay', handleReady)
        currentRef.removeEventListener('waiting', handlePending)
        currentRef.removeEventListener('progress', handlePending)
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
