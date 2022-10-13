import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import VerificationRequest from './verification-request'

export default {
  title: 'user-verification / VerificationRequest',
  component: VerificationRequest,
} as ComponentMeta<typeof VerificationRequest>

// TODO: 서버에 데이터가 없어서 mocking 해야 할 듯
export const ExampleVerificationRequest: ComponentStoryObj<
  typeof VerificationRequest
> = {}
