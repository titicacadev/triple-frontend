import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import SingleSlider from './single-slider'

export default {
  title: 'slider / SingleSlider',
  component: SingleSlider,
} as ComponentMeta<typeof SingleSlider>

export const Baisc: ComponentStoryObj<typeof SingleSlider> = {
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
  },
}
