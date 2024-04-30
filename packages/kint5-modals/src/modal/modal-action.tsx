import styled from 'styled-components'

const ACTION_COLORS = {
  black: '#000',
  blue: '#007AFF',
  red: '#FF322E',
} as const

export const ModalAction = styled.a<{ color?: keyof typeof ACTION_COLORS }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 14px 4px;
  line-height: 1.5;
  font-weight: 700;
  text-align: center;
  color: ${({ color }) => ACTION_COLORS[color || 'black']};
  cursor: pointer;
`
