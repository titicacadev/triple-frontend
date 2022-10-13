import { ComponentMeta, StoryObj } from '@storybook/react'

import ELEMENTS from './elements'

const { text: Text } = ELEMENTS

export default {
  title: 'triple-email-document / Text',
  component: Text,
  argTypes: {
    value: {
      rawHTML: {
        type: 'string',
        require: true,
      },
    },
  },
} as ComponentMeta<typeof Text>

export const TextElement: StoryObj = {
  name: '텍스트',
  args: {
    value: {
      rawHTML: '텍스트 <a href="/regions/:regionId">Inline link</a>',
    },
  },
}
