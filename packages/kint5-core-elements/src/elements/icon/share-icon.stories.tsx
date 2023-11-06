import type { Meta, StoryObj } from '@storybook/react'

import { ShareIcon } from './share-icon'

export default {
  title: 'kint5-core-elements / Icons / Share icon',
  component: ShareIcon,
} as Meta<typeof ShareIcon>

export const Default: StoryObj<typeof ShareIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
