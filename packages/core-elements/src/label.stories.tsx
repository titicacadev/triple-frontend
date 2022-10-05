import { ComponentStoryObj, Meta } from '@storybook/react'

import Label from './elements/label'

export default {
  title: 'Core-Elements / Label',
  component: Label,
} as Meta

export const Radio: ComponentStoryObj<typeof Label> = {
  name: '라디오',
  args: {
    radio: true,
    selected: false,
    children: '최신순',
  },
}

export const Promo: ComponentStoryObj<typeof Label> = {
  name: '최대 24%',
  args: {
    promo: true,
    size: 'medium',
    color: 'purple',
    children: '최대 24%',
  },
}
