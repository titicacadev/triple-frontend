import type { Meta, StoryObj } from '@storybook/react'

import { StickyHeader } from './sticky-header'

export default {
  title: 'tds-ui / StickyHeader',
  component: StickyHeader,
} as Meta

export const Basic: StoryObj = {
  render: (args) => {
    return <StickyHeader {...args}>Basic StickyHeader</StickyHeader>
  },
}
