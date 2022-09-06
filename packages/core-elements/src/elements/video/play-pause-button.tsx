import { useState, useCallback, RefObject, SyntheticEvent } from 'react'
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
  initialVisible,
  playing,
  onPlayPause,
}: {
  forceVisible: boolean
  initialVisible?: boolean
  playing: boolean
  videoRef: RefObject<HTMLVideoElement>
  onPlayPause: (e?: SyntheticEvent) => void
}) {
  const [visible, setVisible] = useState(initialVisible)
  // TODO: useDebouncedState 사용하기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFadeOut = useCallback(
    debounce(() => setVisible(false), 500),
    [],
  )

  const handlePlayPause = useCallback(
    (e) => {
      if (videoRef.current && (visible || forceVisible)) {
        playing ? videoRef.current.pause() : videoRef.current.play()
        e.stopPropagation()
        onPlayPause()
        handleFadeOut()
      }
    },
    [videoRef, playing, forceVisible, visible, onPlayPause, handleFadeOut],
  )

  return (
    <PlayPauseButtonBase
      visible={visible || forceVisible}
      playing={playing}
      onClick={handlePlayPause}
    />
  )
}
