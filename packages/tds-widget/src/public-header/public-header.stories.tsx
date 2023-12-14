import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { PublicHeader } from './public-header'

export default {
  title: 'public-header / PublicHeader',
  component: PublicHeader,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
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

export const DeeplinkPath: StoryObj<typeof PublicHeader> = {
  args: {
    ...Basic.args,
    deeplinkPath: 'https://triple.guide',
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
