import styled from 'styled-components'

const ACTION_COLORS = {
  black: '#000',
  blue: '#1769FF',
  red: '#FF322E',
} as const

export const ModalAction = styled.a<{ color?: keyof typeof ACTION_COLORS }>`
  display: inline-block;
  white-space: nowrap;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: ${({ color }) => ACTION_COLORS[color || 'black']};
  cursor: pointer;
`
