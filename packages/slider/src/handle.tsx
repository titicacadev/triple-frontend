import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

import { SliderBaseProps } from './slider-base'
import COLORS, { Color } from './color'

const HandleContainer = styled.div.attrs<{ percent: number }>(
  ({ percent }) => ({
    style: {
      left: `${percent}%`,
    },
  }),
)`
  position: absolute;
  box-sizing: border-box;
  width: 70px;
  height: 90px;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const HandlePeg = styled.div<{
  color: Color
  handlerSize: number
  handlerBorderWeight: number
  ActivateHandlerShadow?: boolean
}>`
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  font-weight: bold;

  ${({ ActivateHandlerShadow }) =>
    ActivateHandlerShadow &&
    `
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  `}

  ${({ color }) => `
    color: ${COLORS[color].font};
    background-color: ${COLORS[color].background};
  `}

  ${({ handlerSize, handlerBorderWeight }) => `
    width: ${handlerSize}px;
    height: ${handlerSize}px;
    border-radius: ${handlerSize}px;
    line-height: ${handlerSize - handlerBorderWeight * 2}px;
    border: solid ${handlerBorderWeight}px;
  `}
`

export default function Handle({
  color,
  handlerSize,
  displayPercent,
  handlerBorderWeight,
  ActivateHandlerShadow,
  ...props
}: StyledComponentProps<
  'div',
  {},
  {
    percent: number
    handlerSize: number
    displayPercent?: boolean
    handlerBorderWeight: number
    ActivateHandlerShadow?: boolean
    color: Color
  },
  never
>) {
  const { percent } = props

  return (
    <HandleContainer {...props}>
      <HandlePeg
        color={color}
        handlerSize={handlerSize}
        ActivateHandlerShadow={ActivateHandlerShadow}
        handlerBorderWeight={handlerBorderWeight}
      >
        {displayPercent ? percent / 10 : ''}
      </HandlePeg>
    </HandleContainer>
  )
}
