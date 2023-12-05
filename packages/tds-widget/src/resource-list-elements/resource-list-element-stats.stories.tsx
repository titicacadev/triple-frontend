import type { Meta, StoryObj } from '@storybook/react'

import ResourceListElementStats from './resource-list-element-stats'

const meta: Meta<typeof ResourceListElementStats> = {
  title: 'resource-list-element / resource-list-element-stats',
  component: ResourceListElementStats,
}

export default meta

export const Word: StoryObj<typeof ResourceListElementStats> = {
  args: {
    stats: ['볼거리'],
  },
}

export const Phrase: StoryObj<typeof ResourceListElementStats> = {
  args: {
    stats: ['볼거리', '판교'],
  },
}
