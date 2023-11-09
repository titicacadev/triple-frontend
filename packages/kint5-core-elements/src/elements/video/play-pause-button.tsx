import { useCallback, RefObject, SyntheticEvent } from 'react'
import styled from 'styled-components'

const PLAY_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-play@3x.png'
const PAUSE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-stop@3x.png'

interface BaseProps {
  playing: boolean
  visible: boolean
}

const PlayPauseButtonBase = styled.button<BaseProps>`
  position: absolute;
  background: none;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: ${({ playing }) =>
    playing
      ? `url(${PAUSE_BUTTON_IMAGE_URL}) `
      : `url(${PLAY_BUTTON_IMAGE_URL}) `};
  background-size: cover;

  &:focus {
    outline: none;
  }

  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition: opacity 0.3s;
`

interface Props {
  playing: boolean
  visible: boolean
  videoRef: RefObject<HTMLVideoElement>
  onPlayPause: (e?: SyntheticEvent) => void
}

export default function PlayPauseButton({
  playing,
  visible,
  videoRef,
  onPlayPause,
}: Props) {
  const handlePlayPause = useCallback(
    (e: SyntheticEvent) => {
      try {
        if (videoRef.current && visible) {
          playing ? videoRef.current.pause() : videoRef.current.play()
          e.stopPropagation()
          onPlayPause()
        }
      } catch {}
    },
    [videoRef, playing, visible, onPlayPause],
  )
  return (
    <PlayPauseButtonBase
      visible={visible}
      playing={playing}
      onClick={handlePlayPause}
    />
  )
}
