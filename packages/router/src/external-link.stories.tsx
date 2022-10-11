import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { ExternalLink } from './external/link'

export default {
  title: 'Router / External Link',
  component: (args) => (
    <ExternalLink href="/foo" target="current" {...args}>
      테스트링크
    </ExternalLink>
  ),
} as ComponentMeta<typeof ExternalLink>

export const Primary: ComponentStoryObj<typeof ExternalLink> = {}
export const Disabled: ComponentStoryObj<typeof ExternalLink> = {
  ...Primary,
  args: { allowSource: 'none' },
}
