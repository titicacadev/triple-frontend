import React from 'react'

import { TextBubble } from '../text'

export default {
  title: 'chat-bubble / TextBubble',
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
}

export function Primary(args: Parameters<typeof TextBubble>[0]) {
  return <TextBubble {...args}>Content....</TextBubble>
}

Primary.storyName = '기본'
