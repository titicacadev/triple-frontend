import { Meta, StoryObj } from '@storybook/react'

import SingleSlider from './single-slider'

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
