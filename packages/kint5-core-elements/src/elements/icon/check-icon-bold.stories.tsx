import type { Meta, StoryObj } from '@storybook/react'

import { CheckIconBold } from './check-icon-bold'

export default {
  title: 'kint5-core-elements / Icons / Check Icon Bold',
  component: CheckIconBold,
} as Meta<typeof CheckIconBold>

export const Default: StoryObj<typeof CheckIconBold> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
