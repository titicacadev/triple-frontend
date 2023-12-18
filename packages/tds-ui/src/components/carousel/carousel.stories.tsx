import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './carousel'
import IMAGES from './mocks/carousel.sample.json'

const meta: Meta<typeof Carousel> = {
  title: 'tds-ui / Carousel / Carousel ',
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

export const Basic: Story = {
  name: '기본 Carousel',
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
