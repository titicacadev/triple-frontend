import type { Meta, StoryObj } from '@storybook/react'

import { PencilIcon } from './pencil-icon'

export default {
  title: 'kint5-core-elements / Icons / Pencil Icon',
  component: PencilIcon,
} as Meta<typeof PencilIcon>

export const Default: StoryObj<typeof PencilIcon> = {
  render: (args) => <PencilIcon {...args} css={{ width: 24, height: 24 }} />,
  args: {
    color: '#000',
  },
}
