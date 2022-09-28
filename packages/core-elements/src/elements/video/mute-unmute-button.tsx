import styled from 'styled-components'

const MUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-mute@3x.png'
const UNMUTE_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-volume-up@3x.png'

const MuteUnmuteButtonBase = styled.button<{ visible: boolean }>`
  position: absolute;
  right: 3px;
  top: 3px;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
`

interface Props {
  muted: boolean
  visible: boolean
  onClick: () => void
}

export default function MuteUnmuteButton({ muted, visible, onClick }: Props) {
  return (
    <MuteUnmuteButtonBase
      aria-label={muted ? '음소거 해제' : '음소거'}
      visible={visible}
      onClick={onClick}
    >
      <img
        alt=""
        src={muted ? MUTE_BUTTON_IMAGE_URL : UNMUTE_BUTTON_IMAGE_URL}
        width={40}
        height={36}
      />
    </MuteUnmuteButtonBase>
  )
}
