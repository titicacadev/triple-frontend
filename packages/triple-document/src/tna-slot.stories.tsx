import type { Meta } from '@storybook/react'
import { rest } from 'msw'
import { EventTrackingProvider } from '@titicaca/triple-web'

import ELEMENTS from './elements'
import SLOTS from './mocks/slots.sample.json'

const { tnaProducts: TnaProducts } = ELEMENTS

export default {
  title: 'triple-document / T&A Slot',
  component: TnaProducts,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
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
      rest.get('/api/tna-v2/slots/:slotId', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(SLOTS))
      }),
    ],
  },
}
