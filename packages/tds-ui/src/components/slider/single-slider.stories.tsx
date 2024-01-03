import type { Meta, StoryObj } from '@storybook/react'

import { SingleSlider } from './single-slider'

export default {
  title: 'slider / SingleSlider',
  component: SingleSlider,
} as Meta<typeof SingleSlider>

export const Baisc: StoryObj<typeof SingleSlider> = {
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
    initialValue: 0,
    disabled: false,
  },
}

export const Disabled: StoryObj<typeof SingleSlider> = {
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
    initialValue: 0,
    disabled: true,
  },
}
