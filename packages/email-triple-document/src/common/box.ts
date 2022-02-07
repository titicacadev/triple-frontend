import styled from 'styled-components'

interface Positioning {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

const Box = styled.td<{ padding?: Positioning }>`
  padding: ${({ padding }) => {
    const { top, bottom, left, right } = padding || {}
    return [top, right, bottom, left].map(addUnit).join(' ')
  }};
`

function addUnit(value: number | undefined) {
  return value !== undefined && value !== 0 ? `${value}px` : 0
}

export default Box
