import { Meta, StoryObj } from '@storybook/react'

import { Card } from './segment'

const meta = {
  title: 'tds-ui (Layout) / Card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: { children: 'Card' },
}

export const ShadowSmall: Story = {
  args: { ...Default.args, shadow: 'small' },
}

export const ShadowMedium: Story = {
  args: { ...Default.args, shadow: 'medium' },
}

export const ShadowLarge: Story = {
  args: { ...Default.args, shadow: 'large' },
}

export const Radius: Story = {
  args: { ...Default.args, radius: 20 },
}
