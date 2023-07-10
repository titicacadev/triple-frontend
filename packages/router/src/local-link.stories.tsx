import type { Meta, StoryObj } from '@storybook/react'

import { LocalLink } from './local/link'

export default {
  title: 'Router / Local Link',
  component: (args) => (
    <LocalLink href="/foo" target="current" {...args}>
      테스트링크
    </LocalLink>
  ),
} as Meta<typeof LocalLink>

export const Primary: StoryObj<typeof LocalLink> = {}
export const Disabled: StoryObj<typeof LocalLink> = {
  ...Primary,
  args: { allowSource: 'none' },
}
