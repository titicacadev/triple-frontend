import { VerificationRequest } from '@titicaca/user-verification'
import { Meta, StoryObj } from '@storybook/react'

import {
  userAgentProviderDecorator,
  tripleClientMetadataDecorator,
  historyProviderDecorator,
} from '../../decorators'

export default {
  title: 'user-verification / VerificationRequest',
  component: VerificationRequest,
  decorators: [
    historyProviderDecorator,
    userAgentProviderDecorator,
    tripleClientMetadataDecorator,
  ],
} as Meta

export const ExampleVerificationRequest: StoryObj = {
  name: '기본',
}
