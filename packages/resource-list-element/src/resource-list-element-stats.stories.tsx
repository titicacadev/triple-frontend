import { Meta, StoryObj } from '@storybook/react'

import ResourceListElementStats from './stats'

export default {
  title: 'resource-list-element / resource-list-element-stats',
  component: ResourceListElementStats,
} as Meta

export const Basic: StoryObj = {
  args: {
    stats: ['볼거리', '판교'],
  },
}
