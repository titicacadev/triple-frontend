import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { EmailPreview } from './components'

export default {
  title: 'triple-email-document / Preview',
  component: EmailPreview,
  argTypes: {
    value: {
      phrase: {
        type: 'string',
        require: true,
      },
    },
  },
} as ComponentMeta<typeof EmailPreview>

export const DefaultPreview: ComponentStoryObj<typeof EmailPreview> = {
  name: '미리보기',
  args: {
    value: {
      phrase: '지금 10만원 받고, 트리플로 새해여행 어때요?',
    },
  },
}
