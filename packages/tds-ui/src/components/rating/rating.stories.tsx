import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Rating } from './rating'

export default {
  title: 'core-elements / Rating',
  component: Rating,
} as Meta<typeof Rating>

export const Basic: StoryObj<typeof Rating> = {
  args: {
    size: 'tiny',
    score: 5,
  },
}

export const Score: StoryFn<typeof Rating> = () => {
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

export const Size: StoryFn<typeof Rating> = () => {
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
