import styled from 'styled-components'

const ACTION_COLORS = {
  black: '#000',
  blue: '#1769FF',
  red: '#FF322E',
} as const

export const ModalAction = styled.a<{ color?: keyof typeof ACTION_COLORS }>`
  display: inline-block;
  white-space: nowrap;
  font-size: 16px;
  padding: 11px 0;
  line-height: 1.5;
  font-weight: 700;
  text-align: center;
  color: ${({ color }) => ACTION_COLORS[color || 'black']};
  cursor: pointer;
`
