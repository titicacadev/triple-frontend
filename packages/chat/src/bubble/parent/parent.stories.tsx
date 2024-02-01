import { StoryFn } from '@storybook/react'

import Bubble from '../bubble'
import { TextItem } from '../item'
import { ScrollProvider } from '../../chat'

import ParentMessage from './parent-message'
import { ParentMessageUIProp } from './parent-ui'

const Template: StoryFn<ParentMessageUIProp> = (args) => (
  <ScrollProvider>
    <Bubble id="bubble" my={false} parentMessage={args}>
      <TextItem text="안녕하세요" />
    </Bubble>
  </ScrollProvider>
)

export default {
  title: 'chat / BubbleWithParent',
  component: ParentMessage,
  render: Template,
  argTypes: {
    id: {
      type: 'text',
      required: true,
    },
    value: {
      type: 'object',
      required: true,
    },
    blinded: {
      type: 'boolean',
      required: true,
    },
  },
}

export const Image = {
  args: {
    id: 'parent-message',
    type: 'image',
    sender: { profile: { name: '트리플', photo: '' }, unregistered: false },
    value: {
      images: [
        {
          cloudinaryBucket: 'triple-dev',
          cloudinaryId: 'cloudinary',
          id: 'image',
          type: 'image',
          width: 1125,
          height: 2436,
          sizes: {
            full: {
              url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
            },
            large: {
              url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
            },
            smallSquare: {
              url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
            },
          },
        },
      ],
    },
  },
}

export const Text = {
  args: {
    id: 'parent-message',
    type: 'text',
    sender: { profile: { name: '트리플' }, unregistered: false },
    value: {
      message: '반가워요',
    },
    blinded: false,
  },
}
