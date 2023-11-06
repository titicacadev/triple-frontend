import type { Meta, StoryFn } from '@storybook/react'

import { ChatNavbarUI, ChatNavbarUIProps, NavbarItemType } from './index'

export default {
  title: 'chat / ChatNavbar',
  component: ChatNavbarUI,
} as Meta<typeof ChatNavbarUI>

const Template: StoryFn<ChatNavbarUIProps> = (args) => (
  <ChatNavbarUI {...args} />
)

export const Default = {
  render: Template,

  args: {
    title: '1:1 문의',
    items: [
      { type: NavbarItemType.BACK, onClick: () => {} },
      { type: NavbarItemType.MORE, onClick: () => {} },
    ],
  },
}
