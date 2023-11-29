import type { Meta, StoryObj } from '@storybook/react'
import { ImagesProvider } from '@titicaca/react-contexts'

import ImageCarousel from './image-carousel'

export default {
  title: 'poi-detail / ImageCarousel',
  component: ImageCarousel,
} as Meta<typeof ImageCarousel>

export const AttractionOrRestaurant: StoryObj<typeof ImageCarousel> = {
  decorators: [
    (Story) => (
      <ImagesProvider
        source={{
          id: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
          type: 'attraction',
        }}
      >
        <Story />
      </ImagesProvider>
    ),
  ],
}

export const Hotel: StoryObj<typeof ImageCarousel> = {
  decorators: [
    (Story) => (
      <ImagesProvider
        source={{
          id: '1ff98b6f-ca34-4961-ae29-fa52c8ca2e21',
          type: 'hotel',
        }}
      >
        <Story />
      </ImagesProvider>
    ),
  ],
}
