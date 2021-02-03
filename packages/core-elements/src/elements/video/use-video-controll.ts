import React, { useState, useEffect, useCallback } from 'react'

import { formatTime } from './utils'

export function useVideoControll({
  videoRef,
  initialMuted,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
  initialMuted: boolean
}) {
  const [duration, setDuartion] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [seek, setSeek] = useState<string>('')
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(initialMuted)

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

  const handlePlay = useCallback(() => setPlaying(true), [setPlaying])
  const handlePause = useCallback(() => setPlaying(false), [setPlaying])

  const handleSync = useCallback(() => {
    if (videoRef.current) {
      setMuted(videoRef.current.muted)
    }
  }, [videoRef, setMuted])

  useEffect(() => {
    const currentRef = videoRef.current
    if (currentRef) {
      currentRef.addEventListener('durationchange', handleDuartionChange)
      currentRef.addEventListener('progress', handleDuartionChange)
      currentRef.addEventListener('timeupdate', handleTimeUpdate)
      currentRef.addEventListener('play', handlePlay)
      currentRef.addEventListener('pause', handlePause)
      currentRef.addEventListener('volumechange', handleSync)
    } else {
      throw new Error('Cannot use Vidoe Controll State')
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('durationchange', handleDuartionChange)
        currentRef.removeEventListener('progress', handleDuartionChange)
        currentRef.removeEventListener('timeupdate', handleTimeUpdate)
        currentRef.removeEventListener('play', handlePlay)
        currentRef.removeEventListener('pause', handlePause)
        currentRef.removeEventListener('volumechange', handleSync)
      }
    }
  }, [
    videoRef,
    handleDuartionChange,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    handleSync,
  ])

  return {
    duration,
    currentTime,
    progress,
    seek,
    playing,
    muted,
  }
}
