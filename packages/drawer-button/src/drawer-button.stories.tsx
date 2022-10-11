import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import DrawerButton from '.'

export default {
  title: 'drawer-button / DrawerButton',
  component: DrawerButton,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
  },
} as ComponentMeta<typeof DrawerButton>

export const Basic: ComponentStoryObj<typeof DrawerButton> = {
  args: {
    active: true,
    children: '선택 완료',
  },
}
