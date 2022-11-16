import styled from 'styled-components'

import { Container } from '../container'

export interface ButtonGroupProps {
  horizontalGap?: number
  buttonCount?: number
}

export const ButtonGroup = styled(Container)<ButtonGroupProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ horizontalGap = 0 }) => horizontalGap}px;
`
