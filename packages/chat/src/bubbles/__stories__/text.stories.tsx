import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextBubble } from '../text'

export default {
  title: 'chat / TextBubble',
  component: TextBubble,
  argTypes: {
    maxWidthOffset: {
      control: {
        type: 'number',
      },
    },
    backgroundColor: {
      control: {
        type: 'select',
        options: ['gray', 'blue'],
      },
    },
    tailPosition: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
    },
  },
  args: {
    maxWidthOffset: 100,
    backgroundColor: 'gray',
    tailPosition: 'left',
  },
} as ComponentMeta<typeof TextBubble>

export const Primary: ComponentStory<typeof TextBubble> = (args) => {
  return <TextBubble {...args}>Content....</TextBubble>
}

Primary.storyName = '기본'
