import type { Meta } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import SAMPLE from './mocks/triple-header.sample.json'
import TripleHeader from './triple-header'
import { TripleHeader as TripleHeaderProps } from './types'

export default {
  title: 'triple-header / TripleHeader',
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof TripleHeader>

export function Sample() {
  return <TripleHeader>{SAMPLE as TripleHeaderProps}</TripleHeader>
}
