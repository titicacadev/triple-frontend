import { Text } from '@titicaca/core-elements'
import { Autolinker } from 'autolinker'

import { Bubble, BubbleProp } from './bubble'

type TextBubbleProp = {
  id: string
  text: string
  my: boolean
} & BubbleProp

/**
 * 
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

 * 
 */

export function TextBubble({ text, ...props }: TextBubbleProp) {
  return (
    <Bubble {...props}>
      <Text
        css={{
          display: '-webkit-box',
          lineHeight: '21px',
          paddingLeft: 5,
          paddingRight: 5,
          userSelect: 'none',
          wordBreak: 'break-word',
          color: 'inherit',
        }}
        aria-hidden
        dangerouslySetInnerHTML={{
          __html: Autolinker.link(text, {
            newWindow: true,
            stripPrefix: false,
          }),
        }}
      />
    </Bubble>
  )
}
