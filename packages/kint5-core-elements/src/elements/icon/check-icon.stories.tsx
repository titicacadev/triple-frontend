import type { Meta, StoryObj } from '@storybook/react'

import { CheckIcon } from './check-icon'

export default {
  title: 'kint5-core-elements / Icons / Check Icon',
  component: CheckIcon,
} as Meta<typeof CheckIcon>

export const Default: StoryObj<typeof CheckIcon> = {
  render: () => <CheckIcon color="#000" />,
}
