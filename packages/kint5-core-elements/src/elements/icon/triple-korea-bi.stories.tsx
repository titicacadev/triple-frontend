import type { Meta, StoryObj } from '@storybook/react'

import { TripleKoreaBi } from './triple-korea-bi'

export default {
  title: 'kint5-core-elements / Icons / TRIPLE Korea BI',
  component: TripleKoreaBi,
} as Meta<typeof TripleKoreaBi>

export const Default: StoryObj<typeof TripleKoreaBi> = {
  render: (args) => (
    <TripleKoreaBi {...args} css={{ width: 240, height: 96 }} />
  ),
  args: {
    color: '#000',
  },
}
