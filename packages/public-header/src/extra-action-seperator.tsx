import styled from 'styled-components'

import { MIN_DESKTOP_WIDTH } from './constants'

export const ExtraActionSeperator = styled.div`
  display: inline-block;
  width: 1px;
  margin: 0 2px;
  height: 10px;
  background-color: var(--color-gray100);

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: 14px;
  }
`
