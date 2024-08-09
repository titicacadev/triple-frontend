import type { Meta } from '@storybook/react'
import { http, HttpResponse } from 'msw'
import { EventTrackingProvider } from '@titicaca/triple-web'
import { ScrapsProvider } from '@titicaca/tds-widget'

import ELEMENTS from './elements'
import SLOTS from './mocks/slots.sample.json'

const { tnaProducts: TnaProducts } = ELEMENTS

export default {
  title: 'triple-document / T&A Slot',
  component: TnaProducts,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <ScrapsProvider>
          <Story />
        </ScrapsProvider>
      </EventTrackingProvider>
    ),
  ],
} as Meta

export function InTripleDocument() {
  return (
    <TnaProducts
      value={{
        slotId: 1546,
      }}
    />
  )
}
InTripleDocument.storyName = 'Triple-document에 포함된 Slot'
InTripleDocument.parameters = {
  msw: {
    handlers: [
      http.get('/api/tna-v2/slots/:slotId', () => {
        return HttpResponse.json(SLOTS)
      }),
    ],
  },
}
