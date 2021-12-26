import { RangeSlider } from '@titicaca/slider'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'slider / RangeSlider',
  component: RangeSlider,
} as Meta

export const BaseRangeSlider: StoryObj = {
  storyName: 'RangeSlider',
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
  },
}

export const AdjustedRangeSlider: StoryObj = {
  storyName: 'AdjustedRangeSlider',
  args: {
    min: 1,
    max: 31,
    step: 3,
    adjustInitValues: true,
    debounceTime: 800,
    nonLinear: false,
  },
}
