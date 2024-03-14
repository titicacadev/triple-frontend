import type { Meta, StoryObj } from '@storybook/react'
import {
  UserAgentProvider,
  generateUserAgentValues,
} from '@titicaca/react-contexts'

import ImageCarousel from './image-carousel'

export default {
  title: 'kint5-poi-detail / ImageCarousel',
  component: ImageCarousel,
} as Meta<typeof ImageCarousel>

export const AttractionOrRestaurant: StoryObj<typeof ImageCarousel> = {
  decorators: [
    () => (
      <UserAgentProvider
        value={generateUserAgentValues(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-Android/4.2.0',
        )}
      >
        <ImageCarousel
          images={[]}
          poiType="attraction"
          loading={false}
          onPlaceholderClick={() => {}}
        />
      </UserAgentProvider>
    ),
  ],
}
