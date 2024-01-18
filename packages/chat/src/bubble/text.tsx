import { css } from 'styled-components'

import useATagNavigator from '../utils/a-tag-navigator'

import { TextItem } from './item'
import { Bubble } from './bubble'
import { TextBubbleProp } from './type'

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
