import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { debounce } from '@titicaca/view-utilities'

const MUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-mute@3x.png'
const UNMUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-up@3x.png'

const MuteUnmuteButtonBase = styled.button<{
  muted: boolean
  visible: boolean
}>`
  position: absolute;
  border: none;
  background: none;
  width: 40px;
  height: 36px;
  top: 3px;
  right: 3px;
  background-image: url(${({ muted }) =>
    muted ? MUTE_BUTTON_IMAGE_URL : UNMUTE_BUTTON_IMAGE_URL});
  background-size: cover;

  &:focus {
    outline: none;
  }

  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity 0.3s;
`

export default function MuteUnmuteButton({
  muted: initialMuted,
  videoRef,
  forceVisible,
  onMuteUnmute,
}: {
  muted: boolean
  videoRef: React.RefObject<HTMLVideoElement>
  forceVisible: boolean
  onMuteUnmute: (e: React.SyntheticEvent) => void
}) {
  const [muted, setMuted] = useState(initialMuted)
  const [visible, setVisible] = useState(false)

  const handleFadeOut = useCallback(debounce(() => setVisible(false), 5000), [
    setVisible,
  ])

  const handlePlay = useCallback(() => {
    setVisible(true)
    handleFadeOut()
  }, [setVisible, handleFadeOut])

  const handleMuteUnmute = useCallback(
    (e: React.SyntheticEvent) => {
      if (videoRef.current) {
        videoRef.current.muted = !muted

        handleFadeOut()

        onMuteUnmute(e)

        return
      }

      return true
    },
    [muted, handleFadeOut, videoRef, onMuteUnmute],
  )

  const handleSync = useCallback(() => {
    if (videoRef.current) {
      setMuted(videoRef.current.muted)
    }
  }, [setMuted, videoRef])

  useEffect(() => {
    const currentRef = videoRef.current

    if (currentRef) {
      currentRef.addEventListener('volumechange', handleSync)
      currentRef.addEventListener('play', handlePlay)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('volumechange', handleSync)
        currentRef.removeEventListener('play', handlePlay)
      }
    }
  }, [videoRef, handleSync, handlePlay])

  return (
    <MuteUnmuteButtonBase
      muted={muted}
      visible={visible || forceVisible}
      onClick={handleMuteUnmute}
    />
  )
}
