import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'

const BACKGROUND_COLORS: { [key: string]: string } = {
  blue: '#d7e9ff',
  gray: '#f5f5f5',
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

const getBackgroundImage = (my: boolean) => {
  return `https://assets.triple.guide/images/img-speechbubble-${
    my ? 'blue' : 'gray'
  }@3x.png`
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
    background-image: url(${({ my }) => getBackgroundImage(my)});
  }

  ${({ maxWidthOffset }) => `max-width: calc(100% - ${maxWidthOffset}px);`}
  ${({ my }) => css`
    background-color: ${BACKGROUND_COLORS[my ? 'blue' : 'gray']};
    ${TAIL_POSITION_STYLE_MAP[my ? 'right' : 'left']}
  `}
`
