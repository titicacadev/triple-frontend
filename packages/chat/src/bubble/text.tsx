import { css } from 'styled-components'

import useATagNavigator from '../utils/a-tag-navigator'

import { TextItem } from './item'
import { Bubble } from './bubble'
import { TextBubbleProp } from './type'
import ParentMessageUI from './parent/parent-ui'

export function TextBubble({
  message,
  my,
  parentMessage,
  ...props
}: TextBubbleProp) {
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
      {parentMessage ? <ParentMessageUI {...parentMessage} /> : null}
      <TextItem text={message} onClick={(e) => aTagNavigator(e)} />
    </Bubble>
  )
}
