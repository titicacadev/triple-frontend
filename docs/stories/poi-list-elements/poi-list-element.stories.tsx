import { PoiListElement } from '@titicaca/poi-list-elements'
import { ComponentStoryObj, Meta } from '@storybook/react'

import POIS from '../__mocks__/pois.sample.json'
import HOTELS from '../__mocks__/hotels.sample.json'
import {
  eventMetadataDecorator,
  eventTrackingProviderDecorator,
} from '../../decorators'

export default {
  title: 'poi-list-elements / PoiList',
  component: PoiListElement,
  decorators: [eventMetadataDecorator, eventTrackingProviderDecorator],
} as Meta

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
