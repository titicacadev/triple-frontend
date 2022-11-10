import { Meta, Story } from '@storybook/react'

import { StickyHeader } from './sticky-header'

export default {
  title: 'Core-Elements / StickyHeader',
  component: StickyHeader,
} as Meta

export const Basic: Story = (args) => {
  return <StickyHeader {...args}>Basic StickyHeader</StickyHeader>
}
