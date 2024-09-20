import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { EventTrackingProvider, TripleWeb } from '@titicaca/triple-web'

import { PublicHeader } from './public-header'

export default {
  title: 'tds-widget / public-header / PublicHeader',
  component: PublicHeader,
  decorators: [
    (Story, context) => (
      <TripleWeb
        clientAppProvider={null}
        envProvider={{
          appUrlScheme: 'dev-soto',
          basePath: '/',
          webUrlBase: 'https://triple-dev.titicaca-corp.com',
          facebookAppId: '',
          defaultPageTitle: '',
          defaultPageDescription: '',
          googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
          afOnelinkId: '',
          afOnelinkPid: '',
          afOnelinkSubdomain: '',
        }}
        i18nProvider={{
          locale: context.globals.locale,
        }}
        sessionProvider={{
          user: {
            name: '여행자',
            provider: 'KAKAO',
            country: 'KR',
            lang: 'ko',
            unregister: false,
            photo: 'https://assets.triple.guide/images/ico-default-profile.svg',
            mileage: { badges: [], level: 1, point: 0 },
            uid: 'random-user',
            email: 'triple@triple-corp.com',
          },
        }}
        userAgentProvider={{
          ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
          browser: { name: 'WebKit', version: '605.1.15', major: '605' },
          engine: { name: 'WebKit', version: '605.1.15' },
          os: { name: 'iOS', version: '13.3.1' },
          device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
          cpu: { architecture: undefined },
          isMobile: false,
        }}
      >
        <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
          <Story />
        </EventTrackingProvider>
      </TripleWeb>
    ),
  ],
  argTypes: {
    category: {
      control: { type: 'select' },
      options: ['air', 'hotels', 'tna'],
    },
  },
} as Meta<typeof PublicHeader>

export const Basic: StoryObj<typeof PublicHeader> = {
  args: {
    disableAutoHide: true,
  },
}

export const WithSideMenu: StoryObj<typeof PublicHeader> = {
  args: {
    disableAutoHide: true,
    hasSideMenu: true,
  },
}

export const Categories: StoryFn<typeof PublicHeader> = () => {
  return (
    <>
      <PublicHeader disableAutoHide category="air" />
      <PublicHeader disableAutoHide category="hotels" />
      <PublicHeader disableAutoHide category="tna" />
    </>
  )
}
