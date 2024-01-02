import type { Meta, StoryObj } from '@storybook/react'

import { TripleGlobalBi } from './triple-global-bi'

export default {
  title: 'kint5-core-elements / Icons / Triple global BI',
  component: TripleGlobalBi,
} as Meta<typeof TripleGlobalBi>

export const Default: StoryObj<typeof TripleGlobalBi> = {
  args: {
    width: 120,
    height: 48,
    color: '#7743EE',
  },
}
