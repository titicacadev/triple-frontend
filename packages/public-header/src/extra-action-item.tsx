import { gray800 } from '@titicaca/color-palette'
import styled from 'styled-components'

import { MIN_DESKTOP_WIDTH } from './constants'

export const ExtraActionItem = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  color: ${gray800};
  font-size: 14px;
  padding: 10px 8px;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    font-size: 17px;
    padding: 10px 14px;
  }
`
