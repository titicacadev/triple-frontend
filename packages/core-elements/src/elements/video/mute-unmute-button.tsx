import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { debounce } from '@titicaca/view-utilities'

const MUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-mute@3x.png'
const UNMUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-up@3x.png'

interface MuteUnmutButtonBaseProps {
  muted: boolean
  visible: boolean
}

const backgroundImage = ({ muted }: MuteUnmutButtonBaseProps) =>
  muted ? MUTE_BUTTON_IMAGE_URL : UNMUTE_BUTTON_IMAGE_URL
const MuteUnmuteButtonBase = styled.button<MuteUnmutButtonBaseProps>`
  position: absolute;
  border: none;
  background: none;
  width: 40px;
  height: 36px;
  top: 3px;
  right: 3px;
  background-image: url(${backgroundImage});
  background-size: cover;

  &:focus {
    outline: none;
  }

  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity 0.3s;
`

export default function MuteUnmuteButton({
  muted,
  videoRef,
  playing,
  forceVisible,
  onMuteUnmute,
}: {
  playing: boolean
  muted: boolean
  videoRef: React.RefObject<HTMLVideoElement>
  forceVisible: boolean
  onMuteUnmute: (e: React.SyntheticEvent) => void
}) {
  const [visible, setVisible] = useState(false)

  const handleMuteUnmute = useCallback(
    (e: React.SyntheticEvent) => {
      if (videoRef.current) {
        videoRef.current.muted = !muted
        onMuteUnmute(e)
        return
      }

      return true
    },
    [muted, videoRef, onMuteUnmute],
  )

  useEffect(() => {
    if (playing) {
      setVisible(true)
    }
  }, [playing])

  useEffect(() => {
    const handleFadeOut = debounce(() => setVisible(false), 5000)
    if (visible) {
      handleFadeOut()
    }
  }, [visible, forceVisible])

  return (
    <MuteUnmuteButtonBase
      muted={muted}
      visible={visible || forceVisible}
      onClick={handleMuteUnmute}
    />
  )
}
