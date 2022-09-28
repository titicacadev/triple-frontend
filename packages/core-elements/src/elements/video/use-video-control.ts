import { useState, useEffect, RefObject, useMemo } from 'react'

import { formatTime } from './utils'

interface Params {
  videoRef: RefObject<HTMLVideoElement>
  autoPlay: boolean
  initialMuted: boolean
}

export function useVideoControl({ videoRef, autoPlay, initialMuted }: Params) {
  const [mounted, setMounted] = useState(false)
  const [oncePlayed, setOncePlayed] = useState(autoPlay)
  const [pending, setPending] = useState(false)
  const [duration, setDuartion] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [seek, setSeek] = useState<string>('')
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(initialMuted)

  const handlers = useMemo(
    () => ({
      onCanPlay: () => {
        setPending(false)
      },
      onWaiting: () => {
        setPending(true)
      },
      onDurationChange: () => {
        if (videoRef.current) {
          const duration = videoRef.current.duration
          !isNaN(duration) && setDuartion(Math.floor(duration))
        }
      },
      onProgress: () => {
        if (videoRef.current) {
          const currentTime = formatTime(
            Math.floor(videoRef.current.currentTime),
          )

          setCurrentTime(currentTime)
          setProgress(videoRef.current.currentTime)
          setSeek(String(videoRef.current.currentTime))
        }
      },
      onTimeUpdate: () => {
        if (videoRef.current) {
          const currentTime = formatTime(
            Math.floor(videoRef.current.currentTime),
          )

          setCurrentTime(currentTime)
          setProgress(videoRef.current.currentTime)
          setSeek(String(videoRef.current.currentTime))
        }
      },
      onPlay: () => {
        videoRef.current?.play()
        setPlaying(true)
        setOncePlayed(true)
      },
      onPause: () => {
        videoRef.current?.pause()
        setPlaying(false)
      },
      onVolumeChange: () => {
        if (videoRef.current) {
          setMuted(videoRef.current.muted)
        }
      },
    }),
    [videoRef],
  )

  /**
   * iOS 사파리에서 비디오를 처음 재생할 때 아주 짧은 시간 레이아웃이 깨지는 버그가 있습니다.
   * 이 문제를 우회하기 위해 video source를 lazy하게 불러옵니다.
   */
  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    mounted,
    oncePlayed,
    pending,
    duration,
    currentTime,
    progress,
    seek,
    playing,
    muted,
    handlers,
  }
}
