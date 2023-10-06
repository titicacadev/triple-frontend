import type { Meta, StoryObj } from '@storybook/react'

import ResourceListElementStats from './resource-list-element-stats'

export default {
  title: 'resource-list-element / resource-list-element-stats',
  component: ResourceListElementStats,
} as Meta<typeof ResourceListElementStats>

export const Basic: StoryObj<typeof ResourceListElementStats> = {
  args: {
    stats: ['볼거리', '판교'],
  },
}
