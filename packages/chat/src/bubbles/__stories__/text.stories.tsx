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
    my: {
      control: {
        type: 'select',
        options: [true, false],
      },
    },
  },
  args: {
    maxWidthOffset: 100,
    my: false,
  },
} as ComponentMeta<typeof TextBubble>

export const Primary: ComponentStory<typeof TextBubble> = (args) => {
  return <TextBubble {...args}>Content....</TextBubble>
}

Primary.storyName = '기본'
