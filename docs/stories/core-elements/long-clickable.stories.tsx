import { Container, HR1, longClickable } from '@titicaca/core-elements'

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
