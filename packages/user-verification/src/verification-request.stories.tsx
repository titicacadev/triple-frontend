import type { Meta, StoryObj } from '@storybook/react'

import VerificationRequest from './verification-request'

export default {
  title: 'user-verification / VerificationRequest',
  component: VerificationRequest,
} as Meta<typeof VerificationRequest>

// TODO: 서버에 데이터가 없어서 mocking 해야 할 듯
export const ExampleVerificationRequest: StoryObj<typeof VerificationRequest> =
  {
    args: {
      forceVerification: false,
      onCancel: () => {},
    },
  }
