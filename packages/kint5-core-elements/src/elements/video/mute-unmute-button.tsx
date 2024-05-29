import { useCallback, RefObject, SyntheticEvent } from 'react'
import styled from 'styled-components'

import {
  MuteButtonPosition,
  useMuteButtonPosition,
} from './mute-button-position-context'

const MUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-mute@3x.png'
const UNMUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-up@3x.png'

interface MuteUnmuteButtonBaseProps {
  muted: boolean
  visible: boolean
  muteButtonPosition: MuteButtonPosition
}

const MUTE_BUTTON_POSITION: { [position in MuteButtonPosition]: string } = {
  'top-left': 'left: 3px;',
  'top-right': 'right: 3px;',
}

const backgroundImage = ({ muted }: MuteUnmuteButtonBaseProps) =>
  muted ? MUTE_BUTTON_IMAGE_URL : UNMUTE_BUTTON_IMAGE_URL
const MuteUnmuteButtonBase = styled.button<MuteUnmuteButtonBaseProps>`
  position: absolute;
  width: 40px;
  height: 36px;
  top: 3px;
  ${({ muteButtonPosition }) => MUTE_BUTTON_POSITION[muteButtonPosition]}
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
  const { muteButtonPosition } = useMuteButtonPosition()

  const handleMuteUnmute = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation()

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
      muteButtonPosition={muteButtonPosition}
    />
  )
}
