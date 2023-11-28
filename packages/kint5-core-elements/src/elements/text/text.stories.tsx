import { Meta, StoryObj } from '@storybook/react'

import { Text } from './text'

export default {
  title: 'kint5-core-elements / Text',
  component: Text,
} as Meta<typeof Text>

export const Default: StoryObj<typeof Text> = {
  args: {
    children: '123',
  },
}
