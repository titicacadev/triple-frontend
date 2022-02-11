import { ComponentMeta } from '@storybook/react'

import { ELEMENTS } from '../../../packages/triple-email-document'

const { text: Text } = ELEMENTS

export default {
  title: 'Document / triple-email-document',
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

export const TextElement = {
  storyName: '텍스트',
  args: {
    value: {
      rawHTML: '텍스트 <a href="/regions/:regionId">Inline link</a>',
    },
  },
}

TextElement.storyName = '텍스트'
