import type { Meta, StoryObj } from '@storybook/react'

import { CheckIconBold } from './check-icon-bold'

export default {
  title: 'kint5-core-elements / Icons / Check Icon Bold',
  component: CheckIconBold,
} as Meta<typeof CheckIconBold>

export const Default: StoryObj<typeof CheckIconBold> = {
  render: () => <CheckIconBold color="#000" css={{ width: 24, height: 24 }} />,
}
