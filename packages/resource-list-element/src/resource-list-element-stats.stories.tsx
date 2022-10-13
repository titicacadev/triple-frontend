import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import ResourceListElementStats from './resource-list-element-stats'

export default {
  title: 'resource-list-element / resource-list-element-stats',
  component: ResourceListElementStats,
} as ComponentMeta<typeof ResourceListElementStats>

export const Basic: ComponentStoryObj<typeof ResourceListElementStats> = {
  args: {
    stats: ['볼거리', '판교'],
  },
}
