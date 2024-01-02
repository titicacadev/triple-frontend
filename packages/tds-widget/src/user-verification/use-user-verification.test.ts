import { renderHook } from '@testing-library/react'
import { useOpenInlink } from '@titicaca/router'

import { useUserVerification } from './use-user-verification'
import './confirmation-services'

jest.mock('@titicaca/react-hooks', () => ({
  useVisibilityChange: jest.fn(),
}))
jest.mock('@titicaca/router', () => ({
  useOpenInlink: jest.fn().mockReturnValue(jest.fn()),
}))
jest.mock('./confirmation-services', () => ({
  confirmVerification: jest.fn().mockReturnValue({
    verified: true,
    phoneNumber: '01012345678',
  }),
}))
jest.mock('./verified-message')

describe('인증 시작함수를 호출하면 인증 페이지를 엽니다.', () => {
  describe('verificationType에 맞는 URL을 사용합니다.', () => {
    test.each([
      [undefined, '/verifications/?context=purchase'],
      ['sms-verification', '/verifications/?context=purchase'],
      [
        'personal-id-verification-with-residence',
        '/verifications/residence?context=purchase',
      ],
      [
        'personal-id-verification',
        '/verifications/personal-id-verification?context=purchase',
      ],
      [
        'external-promotion-kto-stay-2022',
        '/verifications/external-promotion/kto-stay-2022?context=purchase',
      ],
    ] as const)(
      'VerificationType: %s, path: %s',
      async (verificationType: string | undefined, href: string) => {
        const openInlink = useOpenInlink()

        const {
          result: {
            current: { initiateVerification },
          },
        } = renderHook(useUserVerification, {
          initialProps: {
            forceVerification: false,
            verificationType,
          },
        })

        initiateVerification()

        expect(openInlink).toHaveBeenCalledWith(href, { noNavbar: true })
      },
    )
  })

  describe('verificationContext를 쿼리로 추가합니다.', () => {
    test.each([
      [undefined, '/verifications/?context=purchase'],
      ['purchase', '/verifications/?context=purchase'],
      ['cash', '/verifications/?context=cash'],
    ] as const)(
      'verificationContext: %s, should contain: %s',
      async (verificationContext, href) => {
        const openInlink = useOpenInlink()

        const {
          result: {
            current: { initiateVerification },
          },
        } = renderHook(useUserVerification, {
          initialProps: {
            forceVerification: false,
            verificationContext,
          },
        })

        initiateVerification()

        expect(openInlink).toHaveBeenCalledWith(href, { noNavbar: true })
      },
    )
  })
})
