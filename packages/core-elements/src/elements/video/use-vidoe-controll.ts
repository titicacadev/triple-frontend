import React, { useState, useEffect, useCallback } from 'react'

import { formatTime } from './utils'

export function useVideoControll({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
}) {
  const [duration, setDuartion] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [seek, setSeek] = useState<string>('')

  const handleDuartionChange = useCallback(() => {
    if (videoRef.current) {
      const duration = videoRef.current.duration
      !isNaN(duration) && setDuartion(Math.floor(duration))
    }
  }, [videoRef, setDuartion])

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const currentTime = formatTime(Math.floor(videoRef.current.currentTime))

      setCurrentTime(currentTime)
      setProgress(videoRef.current.currentTime)
      setSeek(String(videoRef.current.currentTime))
    }
  }, [videoRef, setCurrentTime, setProgress, setSeek])

  useEffect(() => {
    const currentRef = videoRef.current
    if (currentRef) {
      currentRef.addEventListener('durationchange', handleDuartionChange)
      currentRef.addEventListener('progress', handleDuartionChange)
      currentRef.addEventListener('timeupdate', handleTimeUpdate)
    } else {
      throw new Error('Cannot use Vidoe Controll State')
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('durationchange', handleDuartionChange)
        currentRef.removeEventListener('progress', handleDuartionChange)
        currentRef.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [videoRef, handleDuartionChange, handleTimeUpdate])

  return {
    duration,
    currentTime,
    progress,
    seek,
  }
}
