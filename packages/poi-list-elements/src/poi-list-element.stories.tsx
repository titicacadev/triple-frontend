import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import POIS from './mocks/pois.sample.json'
import HOTELS from './mocks/hotels.sample.json'
import { PoiListElement } from './poi-list-element'

export default {
  title: 'poi-list-elements / PoiList',
  component: PoiListElement,
} as ComponentMeta<typeof PoiListElement>

const [POI] = POIS
const [HOTEL] = HOTELS

export const PoiList: ComponentStoryObj<typeof PoiListElement> = {
  name: 'POI 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
  },
}

export const HotelList: ComponentStoryObj<typeof PoiListElement> = {
  name: '호텔 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: HOTEL as any,
  },
}

export const TripleDocumentList: ComponentStoryObj<typeof PoiListElement> = {
  name: 'TripleDocument 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
    compact: true,
  },
}
