import { Meta } from '@storybook/react'

import { LocalLink } from './local/link'

export default {
  component: (args) => (
    <LocalLink href="/foo" target="current" {...args}>
      테스트링크
    </LocalLink>
  ),
} as Meta

export const Primary = {}
export const Disabled = {
  ...Primary,
  args: { allowSource: 'none' },
}
