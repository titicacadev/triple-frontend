import { ComponentStoryObj, Meta } from '@storybook/react'

import POIS from './mocks/pois.sample.json'
import PoiCarouselElement from './carousel-element'

export default {
  title: 'poi-list-elements / PoiCarouselElement',
  component: PoiCarouselElement,
} as Meta

const [POI] = POIS

export const TripleDocument: ComponentStoryObj<typeof PoiCarouselElement> = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
    titleTopSpacing: 10,
  },
}
