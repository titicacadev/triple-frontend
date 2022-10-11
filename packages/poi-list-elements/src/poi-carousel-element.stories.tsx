import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import POIS from './mocks/pois.sample.json'
import PoiCarouselElement from './carousel-element'

export default {
  title: 'poi-list-elements / PoiCarouselElement',
  component: PoiCarouselElement,
} as ComponentMeta<typeof PoiCarouselElement>

const [POI] = POIS

export const TripleDocument: ComponentStoryObj<typeof PoiCarouselElement> = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
    titleTopSpacing: 10,
  },
}
