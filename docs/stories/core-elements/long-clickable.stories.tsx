import React from 'react'
import { Container, HR1, longClickable } from '@titicaca/core-elements'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Core-Elements / longClickable',
  component: longClickable,
}

export const LongClickable = () => {
  const LongClickableContainer = longClickable(Container)

  return (
    <>
      <LongClickableContainer
        onClick={action('LongClickable onClick')}
        onLongClick={action('LongClickable onLongClick')}
      >
        This receives long click
      </LongClickableContainer>

      <HR1 />

      <LongClickableContainer onClick={action('non-LongClickable onClick')}>
        This does not receive long click
      </LongClickableContainer>
    </>
  )
}
