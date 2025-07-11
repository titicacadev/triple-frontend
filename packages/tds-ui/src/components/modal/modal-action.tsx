import { styled } from 'styled-components'

import { GlobalColors } from '../../commons'
import { shouldForwardProp } from '../../utils/should-forward-prop'

const ACTION_COLORS: Partial<Record<GlobalColors, string>> = {
  gray: 'rgba(58, 58, 58, 0.5)',
  blue: '#368fff',
}

export const ModalAction = styled.a.withConfig({
  shouldForwardProp,
})<{ color?: GlobalColors | string; disabled?: boolean }>`
  display: inline-block;
  white-space: nowrap;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: ${({ color = 'gray', disabled }) =>
    disabled
      ? '#E9EAEF'
      : color in ACTION_COLORS
        ? ACTION_COLORS[color as GlobalColors]
        : color};
  cursor: pointer;
`
