import { ComponentMeta } from '@storybook/react'

import { ELEMENTS } from '../../../packages/triple-email-document'

const { link: Link } = ELEMENTS

export default {
  title: 'Document / triple-email-document',
  component: Link,
  argTypes: {
    value: {
      id: {
        type: 'string',
        require: true,
      },
      label: {
        type: 'string',
        require,
      },
      href: {
        type: 'string',
        require: true,
      },
      display: {
        type: 'string',
        require: true,
      },
    },
  },
} as ComponentMeta<typeof Link>

export const LinkElement = {
  storyName: '링크',
  args: {
    value: {
      id: 'Link_ID',
      label: '링크 버튼 제목',
      href: '',
      display: 'button',
    },
  },
}

LinkElement.storyName = '링크'
