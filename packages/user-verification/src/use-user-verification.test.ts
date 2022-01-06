import { renderHook } from '@testing-library/react-hooks'
import { useExternalRouter } from '@titicaca/router'

import { useUserVerification, VerificationType } from './use-user-verification'

jest.mock('@titicaca/react-hooks', () => ({
  useVisibilityChange: jest.fn(),
}))
jest.mock('@titicaca/router')
jest.mock('isomorphic-fetch', () => () => {
  return new Response('{"phoneNumber": "01000000000"}', { status: 200 })
})
jest.mock('./verified-message')

describe('인증 시작함수를 호출하면 인증 페이지를 엽니다.', () => {
  function prepareTest({
    forceVerification = false,
    verificationType,
    verificationContext,
  }: Partial<Parameters<typeof useUserVerification>[0]> = {}) {
    const { routeExternally } = mockExternalRouterHook()

    const {
      result: {
        current: { initiateVerification },
      },
    } = renderHook(useUserVerification, {
      initialProps: {
        forceVerification,
        verificationType,
        verificationContext,
      },
    })

    initiateVerification()

    return { routeExternally }
  }

  describe('verificationType에 맞는 URL을 사용합니다.', () => {
    test.each([
      [undefined, '/verifications/'],
      ['sms-verification', '/verifications/'],
      ['personal-id-verification-with-residence', '/verifications/residence'],
      ['personal-id-verification', '/verifications/personal-id-verification'],
    ] as const)(
      'VerificationType: %s, path: %s',
      (verificationType: VerificationType | undefined, href: string) => {
        const { routeExternally } = prepareTest({ verificationType })

        expect(routeExternally).toBeCalledWith(
          expect.objectContaining({
            href: expect.stringContaining(href),
          }),
        )
      },
    )
  })

  describe('verificationContext를 쿼리로 추가합니다.', () => {
    test.each([
      [undefined, 'context=purchase'],
      ['purchase', 'context=purchase'],
      ['cash', 'context=cash'],
    ] as const)(
      'verificationContext: %s, should contain: %s',
      (verificationContext, containingQuery) => {
        const { routeExternally } = prepareTest({ verificationContext })

        expect(routeExternally).toBeCalledWith(
          expect.objectContaining({
            href: expect.stringContaining(containingQuery),
          }),
        )
      },
    )
  })

  test('인증 페이지를 새 창으로 엽니다.', () => {
    const { routeExternally } = prepareTest()

    expect(routeExternally).toBeCalledWith(
      expect.objectContaining({ target: 'new' }),
    )
  })

  test('noNavbar 옵션을 사용합니다.', () => {
    const { routeExternally } = prepareTest()

    expect(routeExternally).toBeCalledWith(
      expect.objectContaining({ noNavbar: true }),
    )
  })
})

function mockExternalRouterHook() {
  const routeExternally = jest.fn()

  ;(
    useExternalRouter as jest.MockedFunction<typeof useExternalRouter>
  ).mockReturnValue(routeExternally)

  return { routeExternally }
}
