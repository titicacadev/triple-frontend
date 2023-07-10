import type { Meta, StoryObj } from '@storybook/react'

import { ExternalLink } from './external/link'

export default {
  title: 'Router / External Link',
  component: (args) => (
    <ExternalLink href="/foo" target="current" {...args}>
      테스트링크
    </ExternalLink>
  ),
} as Meta<typeof ExternalLink>

export const Primary: StoryObj<typeof ExternalLink> = {}
export const Disabled: StoryObj<typeof ExternalLink> = {
  ...Primary,
  args: { allowSource: 'none' },
}
