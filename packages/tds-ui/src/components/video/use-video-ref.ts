import { useRef, useState, useEffect } from 'react'

export function useVideoRef() {
  const [pending, setPending] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const currentRef = videoRef.current

    const handlePending = () => setPending(true)
    const handleReady = () => setPending(false)

    if (currentRef) {
      currentRef.addEventListener('loadstart', handlePending)
      currentRef.addEventListener('loadedmetadata', handleReady)
      currentRef.addEventListener('canplay', handleReady)
      currentRef.addEventListener('play', handleReady)
      currentRef.addEventListener('waiting', handlePending)

      return () => {
        currentRef.removeEventListener('loadstart', handlePending)
        currentRef.removeEventListener('loadedmetadata', handleReady)
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
