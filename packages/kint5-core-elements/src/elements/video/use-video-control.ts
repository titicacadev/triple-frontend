import { useState, useEffect, RefObject } from 'react'

import { formatTime } from './utils'

export function useVideoControl({
  videoRef,
  initialMuted = false,
}: {
  videoRef: RefObject<HTMLVideoElement>
  initialMuted?: boolean
}) {
  const [duration, setDuartion] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [seek, setSeek] = useState<string>('')
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(initialMuted)

  useEffect(() => {
    const currentRef = videoRef.current

    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)

    if (currentRef) {
      const handleDuartionChange = () => {
        const duration = currentRef.duration
        !isNaN(duration) && setDuartion(Math.floor(duration))
      }

      const handleTimeUpdate = () => {
        const currentTime = formatTime(Math.floor(currentRef.currentTime))

        setCurrentTime(currentTime)
        setProgress(currentRef.currentTime)
        setSeek(String(currentRef.currentTime))
      }

      const handleSync = () => {
        setMuted(currentRef.muted)
      }

      currentRef.addEventListener('durationchange', handleDuartionChange)
      currentRef.addEventListener('progress', handleDuartionChange)
      currentRef.addEventListener('timeupdate', handleTimeUpdate)
      currentRef.addEventListener('play', handlePlay)
      currentRef.addEventListener('pause', handlePause)
      currentRef.addEventListener('volumechange', handleSync)

      return () => {
        currentRef.removeEventListener('durationchange', handleDuartionChange)
        currentRef.removeEventListener('progress', handleDuartionChange)
        currentRef.removeEventListener('timeupdate', handleTimeUpdate)
        currentRef.removeEventListener('play', handlePlay)
        currentRef.removeEventListener('pause', handlePause)
        currentRef.removeEventListener('volumechange', handleSync)
      }
    } else {
      throw new Error('Cannot use Vidoe Control State')
    }
  }, [videoRef])

  return {
    duration,
    currentTime,
    progress,
    seek,
    playing,
    muted,
  }
}
