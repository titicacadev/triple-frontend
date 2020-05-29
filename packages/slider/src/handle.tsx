import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

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
  handleSize: number
  handleBorderWeight: number
}>`
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: #368fff;
  text-align: center;
  font-weight: bold;

  ${({ handleSize, handleBorderWeight }) => `
    width: ${handleSize}px;
    height: ${handleSize}px;
    border-radius: ${handleSize}px;
    line-height: ${handleSize - handleBorderWeight * 2}px;
    border: solid ${handleBorderWeight}px #368fff;
  `}
`

export default function Handle({
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
  },
  never
>) {
  const { percent } = props

  return (
    <HandleContainer {...props}>
      <HandlePeg
        handleSize={handleSize}
        handleBorderWeight={handleBorderWeight}
      >
        {displayPercent ? percent / 10 : ''}
      </HandlePeg>
    </HandleContainer>
  )
}
