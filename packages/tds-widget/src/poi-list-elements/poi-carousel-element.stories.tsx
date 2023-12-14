import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import PoiCarouselElement from './carousel-element'
import POIS from './mocks/pois.sample.json'

export default {
  title: 'poi-list-elements / PoiCarouselElement',
  component: PoiCarouselElement,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof PoiCarouselElement>

const [POI] = POIS

export const TripleDocument: StoryObj<typeof PoiCarouselElement> = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
    titleTopSpacing: 10,
  },
}
