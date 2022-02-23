import { Meta } from '@storybook/react'
import { ExternalLink } from '@titicaca/router'

import {
  envProviderDecorator,
  sessionContextProviderDecorator,
} from '../../decorators'

export default {
  component: (args) => (
    <ExternalLink href="/foo" target="current" {...args}>
      테스트링크
    </ExternalLink>
  ),
  decorators: [envProviderDecorator, sessionContextProviderDecorator],
} as Meta

export const Primary = {}
export const Disabled = {
  ...Primary,
  args: { allowSource: 'none' },
}
