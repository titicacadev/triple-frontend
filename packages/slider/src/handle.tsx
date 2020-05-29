import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

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
  handleSize: number
  handleBorderWeight: number
}>`
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  font-weight: bold;

  ${({ color }) => `
    color: ${COLORS[color].font};
    background-color: ${COLORS[color].background};
  `}

  ${({ handleSize, handleBorderWeight }) => `
    width: ${handleSize}px;
    height: ${handleSize}px;
    border-radius: ${handleSize}px;
    line-height: ${handleSize - handleBorderWeight * 2}px;
    border: solid ${handleBorderWeight}px;
  `}
`

export default function Handle({
  color,
  handleSize,
  displayPercent,
  handleBorderWeight,
  ...props
}: StyledComponentProps<
  'div',
  {},
  {
    percent: number
    handleSize: number
    displayPercent?: boolean
    handleBorderWeight: number
    color: Color
  },
  never
>) {
  const { percent } = props

  console.log(COLORS[color])

  return (
    <HandleContainer {...props}>
      <HandlePeg
        color={color}
        handleSize={handleSize}
        handleBorderWeight={handleBorderWeight}
      >
        {displayPercent ? percent / 10 : ''}
      </HandlePeg>
    </HandleContainer>
  )
}
