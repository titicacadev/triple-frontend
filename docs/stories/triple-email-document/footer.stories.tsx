import { ComponentMeta } from '@storybook/react'
import { EmailFooter } from '@titicaca/triple-email-document'

export default {
  component: EmailFooter,
  title: 'Document / triple-email-document / components',
  argsTypes: {
    transitionLink: {
      type: 'string',
      require: true,
    },
  },
} as ComponentMeta<typeof EmailFooter>

export const DefaultFooter = {
  storyName: '푸터',
  args: {
    transitionLink:
      'https://triple-dev.onelink.me/u4VW?pid=triple_email&af_channel=email&is_retargeting=true&af_reengagement_window=7d&af_ad=transition_link&af_dp=dev-soto%3A%2F%2F%2F&af_web_dp=https%3A%2F%2Ftriple-dev.titicaca-corp.com',
  },
}

DefaultFooter.storyName = '푸터'
