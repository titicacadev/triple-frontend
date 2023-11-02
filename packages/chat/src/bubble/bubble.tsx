import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'
import { PropsWithChildren } from 'react'

const BACKGROUND_COLORS: { [key: string]: string } = {
  mint: '#00BB92',
  white: '#ffffff',
}

interface BubbleCSSProp {
  maxWidthOffset?: number
  my: boolean
  hasArrow?: boolean
}
export type BubbleProp = BubbleCSSProp
const StyledBubble = styled(Text).attrs({
  textAlign: 'left',
  inlineBlock: true,
})<BubbleCSSProp>`
  border-radius: 20px;
  position: relative;
  margin: 0;
  padding: 12px 14px;

  > div {
    word-break: break-word;
    white-space: pre-wrap;
  }

  a {
    ${({ my }) => css`
      color: ${my ? '#B5FFFB' : 'var(--color-blue)'} !important;
    `}
    text-decoration: underline !important;
  }

  ${({ maxWidthOffset }) =>
    `max-width: calc(100% - ${maxWidthOffset || 100}px);`}
  ${({ my, hasArrow = true }) => css`
    background-color: ${BACKGROUND_COLORS[my ? 'mint' : 'white']};
    ${my && 'color:  var(--color-white);'}
    ${hasArrow &&
    (my ? 'border-top-right-radius: 4px;' : 'border-top-left-radius: 4px;')};
  `}
`

export function Bubble({ children, ...props }: PropsWithChildren<BubbleProp>) {
  return <StyledBubble {...props}>{children}</StyledBubble>
}
