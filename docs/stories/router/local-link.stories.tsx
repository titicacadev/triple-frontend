import { Meta } from '@storybook/react'
import { LocalLink } from '@titicaca/router'

import {
  envProviderDecorator,
  globalStyleDecorator,
  sessionContextProviderDecorator,
} from '../../decorators'

export default {
  component: (args) => (
    <LocalLink href="/foo" target="current" {...args}>
      테스트링크
    </LocalLink>
  ),
  decorators: [
    globalStyleDecorator,
    envProviderDecorator,
    sessionContextProviderDecorator,
  ],
} as Meta

export const Primary = {}
export const Disabled = {
  ...Primary,
  args: { allowSource: 'none' },
}
