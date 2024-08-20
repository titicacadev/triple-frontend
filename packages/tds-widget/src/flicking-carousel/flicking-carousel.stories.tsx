import type { Meta, StoryObj } from '@storybook/react'

import IMAGES from './mocks/carousel.sample.json'
import { FlickingCarousel } from './flicking-carousel'

const meta: Meta<typeof FlickingCarousel> = {
  title: 'tds-widget / flicking-carousel / FlickingCarousel',
  component: FlickingCarousel,
  parameters: {
    docs: {
      description: {
        component: '@egjs/flicking를 적용한 Carousel 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof FlickingCarousel>

export const Default: Story = {
  render: () => (
    <FlickingCarousel>
      {IMAGES.map((image, key) => (
        <FlickingCarousel.Item key={key} size="large">
          <img
            src={image.sizes.large.url}
            alt="test"
            width={400}
            height={400}
          />
        </FlickingCarousel.Item>
      ))}
    </FlickingCarousel>
  ),
}
