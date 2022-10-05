import Container from './elements/container'
import { HR1 } from './elements/hr'
import { longClickable } from './hocs'

export default {
  title: 'Core-Elements / longClickable',
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
