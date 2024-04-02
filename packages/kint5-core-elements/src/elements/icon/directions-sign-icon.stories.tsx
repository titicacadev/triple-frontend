import type { Meta, StoryObj } from '@storybook/react'

import { DirectionsSignIcon } from './directions-sign-icon'

export default {
  title: 'kint5-core-elements / Icons / Directions Sign Icon',
  component: DirectionsSignIcon,
} as Meta<typeof DirectionsSignIcon>

export const Default: StoryObj<typeof DirectionsSignIcon> = {
  render: () => (
    <DirectionsSignIcon color="#000" css={{ width: 24, height: 24 }} />
  ),
}
