import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { LocalLink } from './local/link'

export default {
  title: 'Router / Local Link',
  component: (args) => (
    <LocalLink href="/foo" target="current" {...args}>
      테스트링크
    </LocalLink>
  ),
} as ComponentMeta<typeof LocalLink>

export const Primary: ComponentStoryObj<typeof LocalLink> = {}
export const Disabled: ComponentStoryObj<typeof LocalLink> = {
  ...Primary,
  args: { allowSource: 'none' },
}
