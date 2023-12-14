import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './carousel'
import IMAGES from './mocks/carousel.sample.json'

const meta: Meta<typeof Carousel> = {
  title: 'tds-ui / Carousel / default',
  component: Carousel,
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Basic: Story = {
  render: () => (
    <Carousel>
      {IMAGES.map((image, key) => (
        <img
          key={key}
          src={image.sizes.large.url}
          alt="test"
          width={400}
          height={400}
        />
      ))}
    </Carousel>
  ),
}
