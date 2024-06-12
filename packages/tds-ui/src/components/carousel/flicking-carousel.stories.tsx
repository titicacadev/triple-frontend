import type { Meta, StoryObj } from '@storybook/react'
import { styled } from 'styled-components'

import { Text } from '../text'

import IMAGES from './mocks/carousel.sample.json'
import { FlickingCarousel } from './flicking-carousel'

const FlickingScrollButton = styled.button<{
  direction: 'left' | 'right'
}>`
  position: absolute;
  width: 60px;
  height: 60px;
  top: calc(50% - 30px);
  ${({ direction }) => (direction === 'left' ? 'left:0;' : 'right:0;')}
  z-index: 60;
  outline: none;
`

const meta: Meta<typeof FlickingCarousel> = {
  title: 'tds-ui (Carousel) / FlickingCarousel',
  component: FlickingCarousel,
  argTypes: {
    currentPage: { type: 'number' },
  },
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
  args: {
    children: (
      <FlickingCarousel.Content>
        {IMAGES.map((image, key) => (
          <img
            key={key}
            src={image.sizes.large.url}
            alt="test"
            width={400}
            height={400}
          />
        ))}
      </FlickingCarousel.Content>
    ),
  },
}

export const PageLabel: Story = {
  args: {
    children: (
      <>
        <FlickingCarousel.PageLabel
          labelElement={
            <Text color="red" bold>
              10
            </Text>
          }
        />

        <FlickingCarousel.Content>
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
        </FlickingCarousel.Content>
      </>
    ),
  },
}

export const ArrowControl: Story = {
  args: {
    children: (
      <>
        <FlickingCarousel.Controls
          onPrevClick={() => {}}
          onNextClick={() => {}}
        />
        <FlickingCarousel.Content>
          {IMAGES.map((image, key) => (
            <FlickingCarousel.Item key={key} size="large">
              <img
                key={key}
                src={image.sizes.large.url}
                alt="test"
                width={400}
                height={400}
              />
            </FlickingCarousel.Item>
          ))}
        </FlickingCarousel.Content>
      </>
    ),
  },
}

export const CustomArrowControl: Story = {
  args: {
    children: (
      <>
        <FlickingCarousel.Controls
          prevButton={
            <FlickingScrollButton direction="left">
              <Text color="blue" bold>
                Prev
              </Text>
            </FlickingScrollButton>
          }
          nextButton={
            <FlickingScrollButton direction="right">
              <Text color="blue" bold>
                Next
              </Text>
            </FlickingScrollButton>
          }
          onPrevClick={() => {}}
          onNextClick={() => {}}
        />
        <FlickingCarousel.Content>
          {IMAGES.map((image, key) => (
            <FlickingCarousel.Item key={key} size="large">
              <img
                key={key}
                src={image.sizes.large.url}
                alt="test"
                width={400}
                height={400}
              />
            </FlickingCarousel.Item>
          ))}
        </FlickingCarousel.Content>
      </>
    ),
  },
}
