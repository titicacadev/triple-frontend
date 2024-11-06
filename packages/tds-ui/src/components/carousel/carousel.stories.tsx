import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './carousel'
import IMAGES from './mocks/carousel.sample.json'
import { CarouselItem } from './carousel-item'

const meta: Meta<typeof Carousel> = {
  title: 'tds-ui (Carousel) / Carousel ',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: 'Only CSS로 작성된 Carousel 컴포넌트 입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  args: {
    children: (
      <>
        {IMAGES.map((image, key) => (
          <CarouselItem key={key} size="big">
            <img src={image.sizes.large.url} alt="test" />
          </CarouselItem>
        ))}
      </>
    ),
  },
}
