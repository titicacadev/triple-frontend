import { Meta, StoryObj } from '@storybook/react'

import DrawerButton from '.'

export default {
  title: 'drawer-button / DrawerButton',
  component: DrawerButton,
} as Meta

export const Basic: StoryObj = {
  name: '기본 버튼',
  args: {
    active: true,
    children: '선택 완료',
  },
}
