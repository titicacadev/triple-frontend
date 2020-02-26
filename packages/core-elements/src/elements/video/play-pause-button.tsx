import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { debounce } from '@titicaca/view-utilities'

const PLAY_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-play@3x.png'
const PAUSE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-stop@3x.png'

const PlayPauseButtonBase = styled.button<{
  playing: boolean
  visible: boolean
}>`
  position: absolute;
  border: none;
  background: none;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${({ playing }) =>
    playing ? PAUSE_BUTTON_IMAGE_URL : PLAY_BUTTON_IMAGE_URL});
  background-size: cover;

  &:focus {
    outline: none;
  }

  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition: opacity 0.3s;
`

export default function PlayPauseButton({
  forceVisible,
  videoRef,
  onPlayPause,
}: {
  forceVisible: boolean
  videoRef: React.RefObject<HTMLVideoElement>
  onPlayPause: (e?: React.SyntheticEvent) => void
}) {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)

  const handleFadeOut = useCallback(debounce(() => setVisible(false), 500), [
    setVisible,
  ])

  const handlePlayPause = useCallback(
    (e) => {
      if (videoRef.current && (visible || forceVisible)) {
        playing ? videoRef.current.pause() : videoRef.current.play()
        e.stopPropagation()

        onPlayPause()

        handleFadeOut()
      }
    },
    [videoRef, playing, handleFadeOut, forceVisible, visible, onPlayPause],
  )

  const handlePlay = useCallback(() => {
    setPlaying(true)
    handleFadeOut()
  }, [setPlaying, handleFadeOut])

  const handlePause = useCallback(() => setPlaying(false), [setPlaying])

  useEffect(() => {
    const currentRef = videoRef.current

    if (currentRef) {
      currentRef.addEventListener('play', handlePlay)
      currentRef.addEventListener('pause', handlePause)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('play', handlePlay)
        currentRef.removeEventListener('pause', handlePause)
      }
    }
  }, [videoRef, handlePlay, handlePause])

  return (
    <PlayPauseButtonBase
      visible={visible || forceVisible}
      playing={playing}
      onClick={handlePlayPause}
    />
  )
}
