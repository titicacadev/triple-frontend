import type { Meta, StoryObj } from '@storybook/react'

import DrawerButton from './drawer-button'

const meta: Meta<typeof DrawerButton> = {
  title: 'tds-ui / DrawerButton',
  component: DrawerButton,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DrawerButton>

export const Default: Story = {
  name: '기본',
  args: {
    active: true,
    children: '선택 완료',
  },
}

export const Disabled: Story = {
  name: '비활성화',
  args: {
    ...Default.args,
    disabled: true,
  },
}
