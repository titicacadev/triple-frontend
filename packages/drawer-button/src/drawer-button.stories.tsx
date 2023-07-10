import type { Meta, StoryObj } from '@storybook/react'

import DrawerButton from '.'

export default {
  title: 'drawer-button / DrawerButton',
  component: DrawerButton,
  parameters: {
    story: {
      inline: false,
      iframeHeight: 300,
    },
  },
} as Meta<typeof DrawerButton>

export const Basic: StoryObj<typeof DrawerButton> = {
  args: {
    active: true,
    children: '선택 완료',
  },
}

export const Disabled: StoryObj<typeof DrawerButton> = {
  args: {
    ...Basic.args,
    disabled: true,
  },
}
