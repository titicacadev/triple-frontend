import type { Meta } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import LAYER_TYPE_SAMPLE from './mocks/layer-type.sample.json'
import JSON_TYPE_SAMPLE from './mocks/json-type.sample.json'
import { TripleHeader } from './triple-header'
import { TripleHeaderProps } from './types'

export default {
  title: 'triple-header / TripleHeader',
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
  component: TripleHeader,
} as Meta<typeof TripleHeader>

export function ImageType() {
  return <TripleHeader>{LAYER_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
}

export function JsonType() {
  return <TripleHeader>{JSON_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
}
