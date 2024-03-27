import { get } from '@titicaca/fetcher'

export function confirmVerification(type: string): Promise<{
  verified: boolean | undefined
  phoneNumber?: string
  error?: string
  payload?: unknown
}> {
  if (type === 'sms-verification') {
    return confirmSmsVerification()
  } else if (type === 'personal-id-verification-with-residence') {
    return confirmPersonalIdVerificationWithResidence()
  } else if (type.match(/^external-promotion-/)) {
    return confirmExternalPromotionEligibility(type)
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

async function confirmExternalPromotionEligibility(type: string) {
  const externalPromotionId = type.replace(/^external-promotion-/, '')

  const response = await get<{
    phoneNumber?: string
  }>(`/api/users/external-promotion/${externalPromotionId}/eligibility`)

  if (response.status === 404) {
    return { verified: false }
  } else if (response.ok) {
    const { phoneNumber, ...payload } = response.parsedBody

    return { verified: true, phoneNumber, payload }
  } else {
    return { verified: undefined, error: JSON.stringify(response.parsedBody) }
  }
}
