import { useCallback, RefObject, SyntheticEvent } from 'react'
import styled from 'styled-components'

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

interface Props {
  muted: boolean
  visible: boolean
  videoRef: RefObject<HTMLVideoElement>
  onMuteUnmute: (e: SyntheticEvent) => void
}

export default function MuteUnmuteButton({
  muted,
  visible,
  videoRef,
  onMuteUnmute,
}: Props) {
  const handleMuteUnmute = useCallback(
    (e: SyntheticEvent) => {
      if (videoRef.current) {
        videoRef.current.muted = !muted
        onMuteUnmute(e)
        return
      }

      return true
    },
    [muted, videoRef, onMuteUnmute],
  )

  return (
    <MuteUnmuteButtonBase
      muted={muted}
      visible={visible}
      onClick={handleMuteUnmute}
    />
  )
}
