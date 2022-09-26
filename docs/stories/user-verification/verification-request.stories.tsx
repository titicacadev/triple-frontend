import { VerificationRequest } from '@titicaca/user-verification'
import { Meta, StoryObj } from '@storybook/react'

import {
  envProviderDecorator,
  sessionContextProviderDecorator,
  userAgentProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'

export default {
  title: 'user-verification / VerificationRequest',
  component: VerificationRequest,
  decorators: [
    userAgentProviderDecorator,
    envProviderDecorator,
    sessionContextProviderDecorator,
    tripleClientMetadataDecorator,
  ],
} as Meta

export const ExampleVerificationRequest: StoryObj = {
  name: '기본',
}
