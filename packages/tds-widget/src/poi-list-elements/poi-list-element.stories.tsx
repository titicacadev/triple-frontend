import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { ScrapsProvider } from '../scrap/provider'

import HOTELS from './mocks/hotels.sample.json'
import POIS from './mocks/pois.sample.json'
import { PoiListElement } from './poi-list-element'

export default {
  title: 'tds-widget / poi-list-elements / PoiList',
  component: PoiListElement,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <ScrapsProvider>
          <Story />
        </ScrapsProvider>
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof PoiListElement>

const [POI] = POIS
const [HOTEL] = HOTELS

export const PoiList: StoryObj<typeof PoiListElement> = {
  name: 'POI 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
  },
}

export const HotelList: StoryObj<typeof PoiListElement> = {
  name: '호텔 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: HOTEL as any,
  },
}

export const TripleDocumentList: StoryObj<typeof PoiListElement> = {
  name: 'TripleDocument 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
    compact: true,
  },
}
