import { css } from 'styled-components'

import useATagNavigator from '../utils/a-tag-navigator'

import { TextItem } from './item'
import { Bubble } from './bubble'
import { TextBubbleProp } from './type'

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

export function TextBubble({ message, my, ...props }: TextBubbleProp) {
  const aTagNavigator = useATagNavigator()

  return (
    <Bubble
      css={css`
        a {
          color: ${my ? '#B5FFFB' : 'var(--color-blue)'};
          text-decoration: underline;
        }
      `}
      my={my}
      {...props}
    >
      <TextItem text={message} onClick={(e) => aTagNavigator(e)} />
    </Bubble>
  )
}
