import type { Meta, StoryObj } from '@storybook/react'

import { TrashCanIcon } from './trash-can-icon'

export default {
  title: 'kint5-core-elements / Icons / Trash Can Icon',
  component: TrashCanIcon,
} as Meta<typeof TrashCanIcon>

export const Default: StoryObj<typeof TrashCanIcon> = {
  render: (args) => <TrashCanIcon {...args} css={{ width: 24, height: 24 }} />,
  args: {
    color: '#000',
  },
}
