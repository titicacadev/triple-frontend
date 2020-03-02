import React, { useState, useCallback, forwardRef } from 'react'
import styled from 'styled-components'
import { debounce } from '@titicaca/view-utilities'

import { GetGlobalColor } from '../../commons'

const SeekerBase = styled.input<{ handleVisible: boolean }>`
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

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: rgba(${GetGlobalColor('blue')}, 1);
    cursor: pointer;
    opacity: ${({ handleVisible }) => (handleVisible ? '1' : '0')};
    transition: opacity 0.3s;
  }

  &::-moz-range-thumb {
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: rgba(${GetGlobalColor('blue')}, 1);
    cursor: pointer;
    opacity: ${({ handleVisible }) => (handleVisible ? '1' : '0')};
    transition: opacity 0.3s;
  }

  &::-ms-thumb {
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: rgba(${GetGlobalColor('blue')}, 1);
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

export default forwardRef(function Seeker(
  {
    duration,
    visible,
    onClick,
    onChange,
  }: {
    duration: number
    visible: boolean
    onClick: (e: React.SyntheticEvent) => void
    onChange: (e: React.SyntheticEvent) => void
  },
  ref: React.Ref<HTMLInputElement>,
) {
  const [handleVisible, setHandleVisible] = useState(false)

  const handleHandleFadeOut = useCallback(
    debounce(() => setHandleVisible(false), 500),
    [setHandleVisible],
  )

  const handleChange = useCallback(
    (e: React.SyntheticEvent) => {
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
      ref={ref}
      type="range"
      max={duration}
      min={0}
      step={0.01}
      onClick={visible ? onClick : undefined}
      onChange={handleChange}
    />
  )
})
