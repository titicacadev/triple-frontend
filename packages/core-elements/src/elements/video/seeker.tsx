import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'
import { ChangeEventHandler } from 'react'

const SeekerBase = styled.input<{ visible: boolean }>`
  appearance: none;
  background: transparent;
  border-color: transparent;
  color: transparent;
  position: absolute;
  left: 45px;
  right: 45px;
  width: calc(100% - 90px);
  bottom: 10px;
  margin: 0;

  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: rgba(${getColor('blue')});
    cursor: pointer;
    transition: opacity 0.3s;
  }

  &::-moz-range-thumb {
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: rgba(${getColor('blue')});
    cursor: pointer;
    transition: opacity 0.3s;
  }

  &::-ms-thumb {
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: rgba(${getColor('blue')});
    cursor: pointer;
    transition: opacity 0.3s;
  }

  &:hover {
    &::-webkit-slider-thumb {
      opacity: 1;
    }
  }
`

interface Props {
  seek: string
  visible: boolean
  duration: number
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Seeker({ seek, visible, duration, onChange }: Props) {
  return (
    <SeekerBase
      value={seek}
      type="range"
      max={duration}
      min={0}
      step={0.01}
      visible={visible}
      onChange={onChange}
    />
  )
}
