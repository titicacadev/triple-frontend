import type { Meta, StoryObj } from '@storybook/react'

import { EllipsisIcon } from './ellipsis-icon'

export default {
  title: 'kint5-core-elements / Icons / Ellipsis Icon',
  component: EllipsisIcon,
} as Meta<typeof EllipsisIcon>

export const Default: StoryObj<typeof EllipsisIcon> = {
  render: () => <EllipsisIcon color="#000" css={{ width: 24, height: 24 }} />,
}
