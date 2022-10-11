import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { PublicHeader } from './public-header'

export default {
  title: 'public-header / PublicHeader',
  component: PublicHeader,
  argTypes: {
    category: {
      control: { type: 'select' },
      options: ['air', 'hotels', 'tna'],
    },
  },
} as ComponentMeta<typeof PublicHeader>

export const Basic: ComponentStoryObj<typeof PublicHeader> = {
  args: {
    deeplinkPath: 'https://triple.guide',
    disableAutoHide: true,
  },
}

export const Air: ComponentStoryObj<typeof PublicHeader> = {
  args: {
    deeplinkPath: 'https://triple.guide',
    disableAutoHide: true,
    category: 'air',
  },
}
export const Hotels: ComponentStoryObj<typeof PublicHeader> = {
  args: {
    deeplinkPath: 'https://triple.guide',
    disableAutoHide: true,
    category: 'hotels',
  },
}

export const Tna: ComponentStoryObj<typeof PublicHeader> = {
  args: {
    deeplinkPath: 'https://triple.guide',
    disableAutoHide: true,
    category: 'tna',
  },
}
