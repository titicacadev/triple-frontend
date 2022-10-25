import styled, { css } from 'styled-components'
import { GetGlobalColor, Text } from '@titicaca/core-elements'

const BACKGROUND_COLORS: { [key: string]: string } = {
  blue: '#d7e9ff',
  gray: '#f5f5f5',
}

const TAIL_POSITION_STYLE_MAP: { [key: string]: ReturnType<typeof css> } = {
  left: css`
    &:before {
      left: -10px;
    }
  `,
  right: css`
    right: 10px;

    &:before {
      right: -10px;
    }
  `,
}

/**
 * RichBubble의 Container로도 사용중
 * FIXME: 말풍선 모양을 만드는 컴포넌트와 text 내용을 스타일링하는 컴포넌트로 분리하기
 */
export const TextBubble = styled(Text).attrs({
  padding: { top: 12, right: 14, bottom: 12, left: 14 },
  textAlign: 'left',
  inlineBlock: true,
})<{
  maxWidthOffset: number
  backgroundColor: keyof typeof BACKGROUND_COLORS
  tailPosition: 'left' | 'right'
}>`
  border-radius: 10px;
  position: relative;

  > div {
    word-break: break-word;
    white-space: pre-wrap;

    > a {
      /* TODO: color-palette로 수정 */
      color: rgb(${GetGlobalColor('blue')}) !important;
      text-decoration: none !important;
    }
  }

  &:before {
    width: 10px;
    height: 17px;
    content: '';
    position: absolute;
    top: 5px;
    background-size: 10px 17px;
  }

  ${({ maxWidthOffset }) => `max-width: calc(100% - ${maxWidthOffset}px);`}
  ${({ backgroundColor }) => css`
    background-color: ${BACKGROUND_COLORS[backgroundColor]};

    &:before {
      background-image: url('https://assets.triple.guide/images/img-speechbubble-${backgroundColor}@3x.png');
    }
  `}
  ${({ tailPosition }) => TAIL_POSITION_STYLE_MAP[tailPosition]}
`
