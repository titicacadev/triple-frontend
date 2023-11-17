import type { Meta, StoryObj } from '@storybook/react'

import { SearchIcon } from './search-icon'

export default {
  title: 'kint5-core-elements / Icons / Search icon',
  component: SearchIcon,
} as Meta<typeof SearchIcon>

export const Default: StoryObj<typeof SearchIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
