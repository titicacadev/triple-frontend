import { ComponentMeta } from '@storybook/react'
import { EmailFeedback } from '@titicaca/triple-email-document'

export default {
  component: EmailFeedback,
  title: 'Document / triple-email-document / components',
  argsTypes: {
    username: {
      type: 'string',
      require: true,
    },
  },
} as ComponentMeta<typeof EmailFeedback>

export const DefaultFeedBack = {
  storyName: '피드백',
  args: {
    username: 'triple',
  },
}

DefaultFeedBack.storyName = '피드백'
