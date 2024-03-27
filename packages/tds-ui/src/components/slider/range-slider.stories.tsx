import type { Meta, StoryObj } from '@storybook/react'

import { RangeSlider } from './range-slider'

const meta: Meta<typeof RangeSlider> = {
  title: 'tds-ui / RangeSlider',
  component: RangeSlider,
}

export default meta

export const Basic: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
    initialValues: [0, 500000],
    disabled: false,
  },
}

export const Adjusted: StoryObj<typeof RangeSlider> = {
  args: {
    min: 1,
    max: 31,
    step: 3,
    adjustInitValues: true,
    debounceTime: 800,
    nonLinear: false,
    initialValues: [1, 31],
    disabled: false,
  },
}

export const Disabled: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 500000,
    debounceTime: 800,
    nonLinear: false,
    initialValues: [0, 500000],
    disabled: true,
  },
}
