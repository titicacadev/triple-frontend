import type { Meta, StoryObj } from '@storybook/react'

import { SingleSlider } from './single-slider'

const meta: Meta<typeof SingleSlider> = {
  title: 'tds-ui / SingleSlider',
  component: SingleSlider,
}

export default meta

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
