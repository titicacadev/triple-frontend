import {
  useState,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react'
import styled from 'styled-components'
import { debounce } from '@titicaca/view-utilities'

const SeekerBase = styled.input<{ handleVisible: boolean }>`
  background: transparent;
  color: transparent;
  position: absolute;
  left: 45px;
  right: 45px;
  width: calc(100% - 90px);
  bottom: 10px;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: var(--color-blue);
    cursor: pointer;
    opacity: ${({ handleVisible }) => (handleVisible ? '1' : '0')};
    transition: opacity 0.3s;
  }

  &::-moz-range-thumb {
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: var(--color-blue);
    cursor: pointer;
    opacity: ${({ handleVisible }) => (handleVisible ? '1' : '0')};
    transition: opacity 0.3s;
  }

  &::-ms-thumb {
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: var(--color-blue);
    cursor: pointer;
    opacity: ${({ handleVisible }) => (handleVisible ? '1' : '0')};
    transition: opacity 0.3s;
  }

  &:hover {
    &::-webkit-slider-thumb {
      opacity: 1;
    }
  }
`

export default function Seeker({
  seek,
  duration,
  visible,
  onClick,
  onChange,
}: {
  seek: string
  duration: number
  visible: boolean
  onClick: MouseEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  const [handleVisible, setHandleVisible] = useState(false)
  // TODO: useDebouncedState 사용하기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleHandleFadeOut = useCallback(
    debounce(() => setHandleVisible(false), 500),
    [setHandleVisible],
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (visible) {
        setHandleVisible(true)
        onChange(e)
        handleHandleFadeOut()
      }
    },
    [visible, onChange, setHandleVisible, handleHandleFadeOut],
  )

  return (
    <SeekerBase
      handleVisible={handleVisible}
      value={seek}
      type="range"
      max={duration}
      min={0}
      step={0.01}
      onClick={visible ? onClick : undefined}
      onChange={handleChange}
    />
  )
}
