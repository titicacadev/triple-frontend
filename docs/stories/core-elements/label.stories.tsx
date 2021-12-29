import { Label } from '@titicaca/core-elements'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'Core-Elements / Label',
  component: Label,
} as Meta

export const Radio: ComponentStoryObj<typeof Label> = {
  storyName: '라디오',
  args: {
    radio: true,
    selected: false,
    children: '최신순',
  },
}

export const Promo: ComponentStoryObj<typeof Label> = {
  storyName: '최대 24%',
  args: {
    promo: true,
    size: 'medium',
    color: 'purple',
    children: '최대 24%',
  },
}
