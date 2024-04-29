import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { ScrapsProvider } from '../scrap/provider'

import { PoiCarouselElement } from './carousel-element'
import POIS from './mocks/pois.sample.json'

export default {
  title: 'tds-widget / poi-list-elements / PoiCarouselElement',
  component: PoiCarouselElement,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <ScrapsProvider>
          <Story />
        </ScrapsProvider>
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
