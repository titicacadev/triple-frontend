import React from 'react'
import PublicHeader, { PublicHeaderProps } from '@titicaca/public-header'
import { Meta, Story } from '@storybook/react'
import {
  EnvProvider,
  generateUserAgentValues,
  UserAgentProvider,
} from '@titicaca/react-contexts'
import {
  ClientContextProvider,
  parseNativeClientUserAgent,
} from '@titicaca/react-client-interfaces'

export default {
  title: 'public-header / PublicHeader',
  component: PublicHeader,
  argTypes: {
    category: {
      control: { type: 'select' },
      options: ['air', 'hotels', 'tna'],
    },
  },
} as Meta

const Template: Story<PublicHeaderProps> = (args) => {
  return (
    <EnvProvider
      afOnelinkId=""
      afOnelinkPid=""
      afOnelinkSubdomain=""
      appUrlScheme=""
      defaultPageDescription=""
      defaultPageTitle=""
      facebookAppId=""
      webUrlBase=""
    >
      <UserAgentProvider value={generateUserAgentValues(navigator.userAgent)}>
        <ClientContextProvider
          {...parseNativeClientUserAgent(navigator.userAgent)}
        >
          <PublicHeader {...args} />
        </ClientContextProvider>
      </UserAgentProvider>
    </EnvProvider>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  deeplinkPath: 'https://triple.guide',
  category: undefined,
}

export const DisableAutoHide = Template.bind({})
DisableAutoHide.args = {
  ...Basic.args,
  disableAutoHide: true,
}
