import type { Meta, StoryObj } from '@storybook/react'

import DrawerButton from './drawer-button'

const meta: Meta<typeof DrawerButton> = {
  title: 'tds-ui / DrawerButton',
  component: DrawerButton,
  args: {
    active: false,
    duration: 300,
    children: '선택 완료',
  },
  argTypes: {
    active: { type: 'boolean' },
    disabled: { type: 'boolean' },
    duration: { type: 'number' },
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DrawerButton>

export const Default: Story = {
  args: {
    active: true,
  },
}

export const Disabled: Story = {
  args: {
    active: true,
    disabled: true,
  },
}
