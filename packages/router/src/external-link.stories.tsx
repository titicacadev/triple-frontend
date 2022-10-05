import { Meta } from '@storybook/react'

import { ExternalLink } from './external/link'

export default {
  component: (args) => (
    <ExternalLink href="/foo" target="current" {...args}>
      테스트링크
    </ExternalLink>
  ),
} as Meta

export const Primary = {}
export const Disabled = {
  ...Primary,
  args: { allowSource: 'none' },
}
