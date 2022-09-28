import { SyntheticEvent } from 'react'
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
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  padding: 0;
  border: 0;
  outline: none;
  background: none;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
`

interface Props {
  playing: boolean
  visible: boolean
  onClick: (e?: SyntheticEvent) => void
}

export default function PlayPauseButton({ playing, visible, onClick }: Props) {
  return (
    <PlayPauseButtonBase
      visible={visible}
      playing={playing}
      aria-label={playing ? '일시정지' : '재생'}
      onClick={onClick}
    >
      <img
        alt=""
        src={playing ? PAUSE_BUTTON_IMAGE_URL : PLAY_BUTTON_IMAGE_URL}
        width={60}
        height={60}
      />
    </PlayPauseButtonBase>
  )
}
