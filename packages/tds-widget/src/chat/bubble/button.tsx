import { css } from 'styled-components'

import { useATagNavigator } from '../utils'

import Bubble from './bubble'
import { ButtonBubbleProp } from './type'
import { TextItem } from './item'

export function ButtonBubble({
  id,
  label,
  action,
  onLinkClick,
  my,
  ...props
}: ButtonBubbleProp) {
  const aTagNavigator = useATagNavigator(onLinkClick)

  return (
    <Bubble
      id={id}
      css={css`
        a {
          color: ${my ? '#B5FFFB' : 'var(--color-blue)'};
          text-decoration: underline;
        }
      `}
      my={my}
      data-bubble-type="button"
      {...props}
    >
      <TextItem
        href={action.param}
        text={label}
        onClick={(e) => aTagNavigator(e)}
      />
    </Bubble>
  )
}
