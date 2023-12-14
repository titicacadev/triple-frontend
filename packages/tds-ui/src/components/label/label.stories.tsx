import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './label'

export default {
  title: 'tds-ui / Label',
  component: Label,
} as Meta

export const Radio: StoryObj<typeof Label> = {
  name: '라디오',
  args: {
    radio: true,
    selected: false,
    children: '최신순',
  },
}

export const Promo: StoryObj<typeof Label> = {
  name: '최대 24%',
  args: {
    promo: true,
    size: 'medium',
    color: 'purple',
    children: '최대 24%',
  },
}
