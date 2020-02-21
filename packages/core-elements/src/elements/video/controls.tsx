import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'

import { debounce } from '@titicaca/view-utilities'

import { GetGlobalColor } from '../../commons'

import Seeker from './seeker'
import { formatTime } from './utils'

const ControlsContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  background-color: rgba(0, 0, 0, 0.4);

  transition: opacity 0.3s;
`

const PlayPauseButton = styled.button<{ playing: boolean }>`
  position: absolute;
  border: none;
  background: none;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ playing }) => (playing ? 'red' : 'blue')};
`

const CurrentTime = styled.div`
  position: absolute;
  color: #ffffff;
  font-size: 10px;
  left: 0;
  bottom: 12px;
  width: 45px;
  text-align: center;
`

const Duration = styled.div`
  position: absolute;
  font-size: 10px;
  color: #ffffff;
  right: 0px;
  bottom: 12px;
  width: 45px;
  text-align: center;
`

const Progress = styled.progress`
  position: absolute;
  left: 45px;
  right: 45px;
  bottom: 10px;
  padding: 0;
  margin: 0;
  width: calc(100% - 90px);
  appearance: none;

  &::-webkit-progress-bar {
    position: absolute;
    bottom: 5px;
    height: 3px;
    border-radius: 2.5px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-progress-value {
    border-radius: 2.5px;
    background-color: rgba(${GetGlobalColor('blue')}, 1);
  }
`

export default function Controls({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
}) {
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState<number>(0)
  const currentTimeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLProgressElement>(null)
  const seekerRef = useRef<HTMLInputElement>(null)

  const handlePlay = useCallback(() => setPlaying(true), [setPlaying])
  const handlePause = useCallback(() => setPlaying(false), [setPlaying])
  const handleDurationChange = useCallback(
    () =>
      videoRef.current && setDuration(Math.floor(videoRef.current.duration)),
    [videoRef, setDuration],
  )
  const handleTimeUpdate = useCallback(() => {
    if (currentTimeRef.current && videoRef.current) {
      currentTimeRef.current.innerHTML = formatTime(
        Math.floor(videoRef.current.currentTime),
      )
    }

    if (progressRef.current && videoRef.current) {
      progressRef.current.value = videoRef.current.currentTime
    }

    if (seekerRef.current && videoRef.current) {
      seekerRef.current.value = String(videoRef.current.currentTime)
    }
  }, [currentTimeRef, videoRef, progressRef, seekerRef])

  useEffect(() => {
    const currentRef = videoRef.current

    if (currentRef) {
      currentRef.addEventListener('play', handlePlay)
      currentRef.addEventListener('pause', handlePause)
      currentRef.addEventListener('durationchange', handleDurationChange)
      currentRef.addEventListener('timeupdate', handleTimeUpdate)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('play', handlePlay)
        currentRef.removeEventListener('pause', handlePause)
        currentRef.removeEventListener('durationchange', handleDurationChange)
        currentRef.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [
    videoRef,
    handlePlay,
    handlePause,
    handleDurationChange,
    handleTimeUpdate,
  ])

  const handleFadeOut = useCallback(debounce(() => setVisible(false), 2500), [
    setVisible,
  ])

  const handleFadeIn = useCallback(() => {
    setVisible(true)
    handleFadeOut()
  }, [setVisible, handleFadeOut])

  const handlePlayPause = useCallback(
    (e) => {
      if (videoRef.current) {
        playing ? videoRef.current.pause() : videoRef.current.play()
      }

      e.stopPropagation()
      handleFadeOut()
    },
    [videoRef, playing, handleFadeOut],
  )

  const handleSeekerChange = useCallback(
    (e) => {
      if (videoRef.current) {
        videoRef.current.currentTime = parseFloat(e.target.value)
      }

      handleFadeOut()
    },
    [videoRef, handleFadeOut],
  )

  const handleSeekerClick = useCallback(
    (e) => {
      e.stopPropagation()
      handleFadeOut()
    },
    [handleFadeOut],
  )

  return (
    <ControlsContainer
      visible={visible}
      onClick={visible ? () => setVisible(false) : handleFadeIn}
    >
      {visible ? (
        <PlayPauseButton playing={playing} onClick={handlePlayPause} />
      ) : null}
      <CurrentTime ref={currentTimeRef}>00:00</CurrentTime>
      <Duration>{formatTime(duration)}</Duration>
      <Progress max={duration} value={0} ref={progressRef} />
      <Seeker
        visible={visible}
        ref={seekerRef}
        duration={duration}
        onClick={handleSeekerClick}
        onChange={handleSeekerChange}
      />
    </ControlsContainer>
  )
}
