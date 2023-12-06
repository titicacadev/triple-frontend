import type { Meta, StoryObj } from '@storybook/react'

import ImageCarousel from './image-carousel'
import { ImageCarouselProvider } from './image-carousel/provider'

export default {
  title: 'poi-detail / ImageCarousel',
  component: ImageCarousel,
} as Meta<typeof ImageCarousel>

export const AttractionOrRestaurant: StoryObj<typeof ImageCarousel> = {
  decorators: [
    (Story) => (
      <ImageCarouselProvider
        source={{
          id: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
          type: 'attraction',
        }}
      >
        <Story />
      </ImageCarouselProvider>
    ),
  ],
}

export const Hotel: StoryObj<typeof ImageCarousel> = {
  decorators: [
    (Story) => (
      <ImageCarouselProvider
        source={{
          id: '1ff98b6f-ca34-4961-ae29-fa52c8ca2e21',
          type: 'hotel',
        }}
      >
        <Story />
      </ImageCarouselProvider>
    ),
  ],
}
