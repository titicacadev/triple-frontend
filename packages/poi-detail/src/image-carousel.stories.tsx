import {
  ImagesProvider,
  UserAgentProvider,
  generateUserAgentValues,
} from '@titicaca/react-contexts'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import ImageCarousel from './image-carousel'

export default {
  title: 'poi-detail / ImageCarousel',
  component: ImageCarousel,
} as ComponentMeta<typeof ImageCarousel>

export const AttractionOrRestaurant: ComponentStoryObj<typeof ImageCarousel> = {
  decorators: [
    (Story) => (
      <UserAgentProvider
        value={generateUserAgentValues(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-Android/4.2.0',
        )}
      >
        <ImagesProvider
          source={{
            id: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
            type: 'attraction',
          }}
        >
          <Story />
        </ImagesProvider>
      </UserAgentProvider>
    ),
  ],
}

export const Hotel: ComponentStoryObj<typeof ImageCarousel> = {
  decorators: [
    (Story) => (
      <UserAgentProvider
        value={generateUserAgentValues(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-Android/4.2.0',
        )}
      >
        <ImagesProvider
          source={{
            id: '1ff98b6f-ca34-4961-ae29-fa52c8ca2e21',
            type: 'hotel',
          }}
        >
          <Story />
        </ImagesProvider>
      </UserAgentProvider>
    ),
  ],
}
