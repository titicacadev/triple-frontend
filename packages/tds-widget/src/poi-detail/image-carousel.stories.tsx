import type { Meta, StoryObj } from '@storybook/react'

import { PoiDetailImageCarousel } from './image-carousel'
import { PoiDetailImagesProvider } from './images-provider'

export default {
  title: 'poi-detail / ImageCarousel',
  component: PoiDetailImageCarousel,
} as Meta<typeof PoiDetailImageCarousel>

export const AttractionOrRestaurant: StoryObj<typeof PoiDetailImageCarousel> = {
  args: {
    onBusinessHoursClick: undefined,
  },
  decorators: [
    (Story) => (
      <PoiDetailImagesProvider
        source={{
          id: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
          type: 'attraction',
        }}
      >
        <Story />
      </PoiDetailImagesProvider>
    ),
  ],
}

export const Hotel: StoryObj<typeof PoiDetailImageCarousel> = {
  args: {
    onBusinessHoursClick: undefined,
  },
  decorators: [
    (Story) => (
      <PoiDetailImagesProvider
        source={{
          id: '1ff98b6f-ca34-4961-ae29-fa52c8ca2e21',
          type: 'hotel',
        }}
      >
        <Story />
      </PoiDetailImagesProvider>
    ),
  ],
}
