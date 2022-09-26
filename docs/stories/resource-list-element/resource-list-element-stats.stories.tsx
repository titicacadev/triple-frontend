import { ResourceListElementStats } from '@titicaca/resource-list-element'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'resource-list-element / resource-list-element-stats',
  component: ResourceListElementStats,
} as Meta

export const Basic: StoryObj = {
  args: {
    stats: ['볼거리', '판교'],
  },
}
