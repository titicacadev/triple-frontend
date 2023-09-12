import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'

import { BackgroundColor } from '../types'

const BACKGROUND_COLORS: {
  [key in BackgroundColor]: string
} = {
  blue: '#d7e9ff',
  gray: '#f5f5f5',
  darkGray: '#F6F6F6',
  mint: '#24CABD',
}

const TAIL_POSITION_STYLE_MAP: { [key: string]: ReturnType<typeof css> } = {
  left: css`
    &::before {
      left: -10px;
    }
  `,
  right: css`
    right: 10px;

    &::before {
      right: -10px;
    }
  `,
}

const getBackgroundImage = (color: BackgroundColor) => {
  return `https://assets.triple-dev.titicaca-corp.com/images/img-speechbubble-${color}@3x.png`
}

function getDefaultBackgroundColor(my: boolean) {
  return my ? 'blue' : 'gray'
}

/**
 * RichBubble의 Container로도 사용중
 */
export const TextBubble = styled(Text).attrs({
  padding: { top: 12, right: 14, bottom: 12, left: 14 },
  textAlign: 'left',
  inlineBlock: true,
})<{
  maxWidthOffset: number
  my: boolean
  bubbleColor?: { backgroundColor: BackgroundColor; text: string }
}>`
  border-radius: 10px;
  position: relative;

  > div {
    word-break: break-word;
    white-space: pre-wrap;

    > a {
      color: var(--color-blue) !important;
      text-decoration: none !important;
    }
  }

  &::before {
    width: 10px;
    height: 17px;
    content: '';
    position: absolute;
    top: 5px;
    background-size: 10px 17px;
    ${({ my, bubbleColor }) => css`
      background-image: url(${getBackgroundImage(
        bubbleColor?.backgroundColor || getDefaultBackgroundColor(my),
      )});
    `}
  }

  ${({ maxWidthOffset }) => `max-width: calc(100% - ${maxWidthOffset}px);`}
  ${({ my, bubbleColor }) =>
    css`
      background-color: ${BACKGROUND_COLORS[
        bubbleColor?.backgroundColor || getDefaultBackgroundColor(my)
      ]};
      color: ${bubbleColor?.text || 'var(--color-gray)'};
    `}
  ${({ my }) => css`
    ${TAIL_POSITION_STYLE_MAP[my ? 'right' : 'left']}
  `}
`
