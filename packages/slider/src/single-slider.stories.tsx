import { SingleSlider } from '@titicaca/slider'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'slider / SingleSlider',
  component: SingleSlider,
} as Meta

export const BaseSingleSlider: StoryObj = {
  name: 'SingleSlider',
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
  },
}
