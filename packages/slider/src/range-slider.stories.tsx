import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import RangeSlider from './range-slider'

export default {
  title: 'slider / RangeSlider',
  component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>

export const Basic: ComponentStoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
    initialValues: [0, 500000],
  },
}

export const Adjusted: ComponentStoryObj<typeof RangeSlider> = {
  args: {
    min: 1,
    max: 31,
    step: 3,
    adjustInitValues: true,
    debounceTime: 800,
    nonLinear: false,
    initialValues: [1, 31],
  },
}
