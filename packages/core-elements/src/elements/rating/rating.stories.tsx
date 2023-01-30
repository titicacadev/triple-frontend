import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'

import { Rating } from './rating'

export default {
  title: 'core-elements / Rating',
  component: Rating,
} as ComponentMeta<typeof Rating>

export const Basic: ComponentStoryObj<typeof Rating> = {
  args: {
    size: 'tiny',
    score: 5,
  },
}

export const Score: ComponentStory<typeof Rating> = () => {
  return (
    <>
      <Rating size="tiny" score={3} />
      <br />
      <Rating size="tiny" score={-6} />
      <br />
      <Rating size="tiny" score={11} />
    </>
  )
}

export const Size: ComponentStory<typeof Rating> = () => {
  return (
    <>
      <Rating size="tiny" score={3} />
      <br />
      <Rating size="small" score={3} />
      <br />
      <Rating size="medium" score={3} />
    </>
  )
}
