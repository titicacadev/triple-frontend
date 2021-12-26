import DrawerButton from '@titicaca/drawer-button'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'drawer-button / DrawerButton',
  component: DrawerButton,
} as Meta

export const Basic: StoryObj = {
  storyName: '기본 버튼',
  args: {
    active: false,
    children: '선택 완료',
  },
}
