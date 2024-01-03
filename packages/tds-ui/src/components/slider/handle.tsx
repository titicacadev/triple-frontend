import { GetHandleProps } from 'react-compound-slider'
import styled from 'styled-components'

const HandleContainer = styled.div`
  position: absolute;
  width: 70px;
  height: 90px;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const HandlePeg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  border: solid 3px #368fff;
  background-color: #fff;
  transform: translate(-50%, -50%);
  z-index: 1;
`

interface Props {
  id: string
  percent: number
  value: number
  max: number
  min: number
  getHandleProps: GetHandleProps
}

export function Handle({
  id,
  percent,
  value,
  max,
  min,
  getHandleProps,
}: Props) {
  return (
    <HandleContainer
      tabIndex={0}
      role="slider"
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-orientation="horizontal"
      style={{
        left: `${percent}%`,
      }}
      {...getHandleProps(id)}
    >
      <HandlePeg />
    </HandleContainer>
  )
}
