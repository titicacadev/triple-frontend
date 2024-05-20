import React from 'react'
import { ClientAppName } from '@titicaca/triple-web'
import { renderHook } from '@testing-library/react'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { useOpenNativeLink } from './use-open-native-link'

const transitionModalShowMockFn = jest.fn()

jest.mock('@titicaca/triple-web', () => ({
  ...jest.requireActual('@titicaca/triple-web'),
  useEnv: jest.fn().mockReturnValue({
    appUrlScheme: 'triple-test',
    webUrlBase: 'https://triple.guide',
  }),
  useTransitionModal: jest
    .fn()
    .mockImplementation(() => ({ show: transitionModalShowMockFn })),
  useSessionAvailability: jest.fn(),
}))

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      href: '/',
    },
    writable: true,
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn())

test('인 앱 웹뷰에서는 딥링크로 이동합니다.', () => {
  const { result } = renderHook(() => useOpenNativeLink(), {
    wrapper: createTestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.Android, version: '6.5.0' },
      },
    }),
  })

  result.current('/test-path')

  // Assuming makeInlink is a function that formats the URL correctly
  expect(window.location.href).toBe('triple-test:///test-path')
})

test('인 앱 웹뷰가 아니면 TransitionModal을 엽니다.', () => {
  const { result } = renderHook(() => useOpenNativeLink(), {
    wrapper: createTestWrapper(),
  })

  result.current('/test-path')

  expect(transitionModalShowMockFn).toHaveBeenCalled()
})
