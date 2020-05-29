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

const HandlePeg = styled.div<{ handleSize: number }>`
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  border: solid 3px #368fff;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  z-index: 1;

  ${({ handleSize }) => `
    width: ${handleSize}px;
    height: ${handleSize}px;
    border-radius: ${handleSize}px;
  `}
`

export default function Handle({
  handleSize,
  ...props
}: StyledComponentProps<
  'div',
  {},
  { percent: number; handleSize: number },
  never
>) {
  return (
    <HandleContainer {...props}>
      <HandlePeg handleSize={handleSize} />
    </HandleContainer>
  )
}
