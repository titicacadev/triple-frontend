import React from 'react'
import { VerificationRequest } from '@titicaca/user-verification'
import { action } from '@storybook/addon-actions'

export default {
  title: 'user-verification | VerificationRequest',
}

export function ExampleVerificationRequest() {
  return <VerificationRequest onCancel={action('onCancel')} />
}

ExampleVerificationRequest.story = {
  name: '기본',
}
