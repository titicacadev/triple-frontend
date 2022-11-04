import styled from 'styled-components'
import { MarginPadding } from '@titicaca/core-elements'

const Box = styled.td<{ padding?: MarginPadding }>`
  /* stylelint-disable function-whitespace-after */
  padding: ${({ padding }) => {
    const { top, bottom, left, right } = padding || {}
    return [top, right, bottom, left].map(addUnit).join(' ')
  }};
`

function addUnit(value: string | number | undefined) {
  return value !== undefined && value !== 0 ? `${value}px` : 0
}

export default Box
