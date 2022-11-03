import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BubbleInfo } from './bubble-info'

export default {
  title: 'chat / BubbleInfo',
  component: BubbleInfo,
  argTypes: {
    date: {
      control: {
        type: 'date',
      },
    },
  },
} as ComponentMeta<typeof BubbleInfo>

export const Primary: ComponentStory<typeof BubbleInfo> = (args) => {
  return <BubbleInfo {...args} />
}

Primary.storyName = '기본'
Primary.args = {
  unreadCount: 1,
  date: new Date().toString(),
}
