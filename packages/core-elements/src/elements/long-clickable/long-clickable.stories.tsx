import { Container } from '../container'
import { HR1 } from '../hr'

import { longClickable } from './long-clickable'

export default {
  title: 'core-elements / longClickable',
  component: longClickable,
}

export const LongClickable = () => {
  const LongClickableContainer = longClickable(Container)

  return (
    <>
      <LongClickableContainer>This receives long click</LongClickableContainer>

      <HR1 />

      <LongClickableContainer>
        This does not receive long click
      </LongClickableContainer>
    </>
  )
}
