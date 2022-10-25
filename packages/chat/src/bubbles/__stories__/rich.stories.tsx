import React from 'react'

import { MessageType } from '../../types'
import { RichBubble } from '../rich'

import { MEDIA_ARGS, SAMPLE_IMAGES } from './constants'

export default {
  title: 'chat-bubble / RichBubble',
  component: RichBubble,
  argTypes: {
    textBubbleFontSize: {
      control: {
        type: 'select',
        options: ['medium', 'large'],
      },
    },
  },
}

export function Primary(args: Parameters<typeof RichBubble>[0]) {
  return <RichBubble {...args} />
}

Primary.storyName = '기본'
Primary.args = {
  ...MEDIA_ARGS,
  my: false,
  items: [
    {
      type: MessageType.TEXT,
      message: '안녕하세요, 테스트 메시지 입니다.',
    },
    { type: MessageType.IMAGES, images: SAMPLE_IMAGES },
    {
      type: MessageType.BUTTON,
      label: '누르기',
      action: {
        type: MessageType.LINK,
        param: window.location.href,
      },
    },
  ],
  textBubbleFontSize: 'medium',
  textBubbleMaxWidthOffset: 100,
}
