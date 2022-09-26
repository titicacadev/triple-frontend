import { StickyHeader } from '@titicaca/core-elements'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Core-Elements / StickyHeader',
  component: StickyHeader,
} as Meta

export const Basic: Story = (args) => {
  return <StickyHeader {...args}>Basic StickyHeader</StickyHeader>
}
