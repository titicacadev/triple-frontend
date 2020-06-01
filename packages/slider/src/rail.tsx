import styled from 'styled-components'
import { brightGray, blue } from '@titicaca/color-palette'

export default styled.div<{ railHeight?: number; active?: boolean }>`
  position: absolute;
  width: 100%;
  border-radius: 4px;
  background-color: ${brightGray};
  transform: translate(0, -50%);

  ${({ railHeight = 3 }) => `height: ${railHeight}px;`}
  ${({ active }) =>
    active &&
    `
    position: relative;
    background-color: ${blue};
  `}
`
