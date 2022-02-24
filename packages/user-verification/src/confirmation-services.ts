import { get } from '@titicaca/fetcher'

import type { VerificationType } from './types'

export function confirmVerification(type: VerificationType): Promise<{
  verified: boolean | undefined
  phoneNumber?: string
  error?: string
  payload?: unknown
}> {
  if (type === 'sms-verification') {
    return confirmSmsVerification()
  } else if (type === 'personal-id-verification-with-residence') {
    return confirmPersonalIdVerificationWithResidence()
  } else {
    return confirmPersonalIdVerification()
  }
}

async function confirmSmsVerification() {
  const response = await get<{
    phoneNumber: string
  }>('/api/users/smscert')

  if (response.status === 404) {
    return { verified: false }
  } else if (response.ok) {
    const { phoneNumber, ...payload } = response.parsedBody

    return { verified: true, phoneNumber, payload }
  } else {
    return { verified: undefined, error: JSON.stringify(response.parsedBody) }
  }
}

async function confirmPersonalIdVerificationWithResidence() {
  const response = await get<{
    phoneNumber: string
  }>('/api/users/kto-stay-2021')

  if (response.status === 404) {
    return { verified: false }
  } else if (response.ok) {
    const { phoneNumber, ...payload } = response.parsedBody

    return { verified: true, phoneNumber, payload }
  } else {
    return { verified: undefined, error: JSON.stringify(response.parsedBody) }
  }
}

async function confirmPersonalIdVerification() {
  const response = await get<{
    mobile: string
  }>('/api/users/namecheck')

  if (response.status === 404) {
    return { verified: false }
  } else if (response.ok) {
    const { mobile: phoneNumber, ...payload } = response.parsedBody

    return { verified: true, phoneNumber, payload }
  } else {
    return { verified: undefined, error: JSON.stringify(response.parsedBody) }
  }
}
