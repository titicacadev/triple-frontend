import { ComponentMeta } from '@storybook/react'
import { ELEMENTS } from '@titicaca/triple-email-document'

const { link: Link } = ELEMENTS

export default {
  title: 'Document / triple-email-document / elements / 링크',
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

export const ButtonLinkElement = {
  storyName: '버튼',
  args: {
    value: {
      id: 'Link_ID',
      label: '버튼 디자인 형식',
      href: '',
      display: 'button',
    },
  },
}

ButtonLinkElement.storyName = '버튼'

export const LinkElement = {
  storyName: '박스',
  args: {
    value: {
      id: 'Link_ID',
      label: '박스 디자인 형식',
      href: '',
      display: 'block',
    },
  },
}

LinkElement.storyName = '블락'
