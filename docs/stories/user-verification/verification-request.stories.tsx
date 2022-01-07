import { VerificationRequest } from '@titicaca/user-verification'
import { Meta, StoryObj } from '@storybook/react'

import { clientContextProviderDecorator } from '../../decorators'

export default {
  title: 'user-verification / VerificationRequest',
  component: VerificationRequest,
  decorators: [clientContextProviderDecorator],
} as Meta

export const ExampleVerificationRequest: StoryObj = {
  storyName: '기본',
}
