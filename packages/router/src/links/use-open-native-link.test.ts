import { ClientAppName, TestWrapper } from '@titicaca/triple-web'
import { renderHook } from '@testing-library/react'

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
}))

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      href: '/',
      hash: jest.fn(),
    },
    writable: true,
  })
  // ;(useEnv as jest.MockedFunction<typeof useEnv>).mockReturnValue({
  //   appUrlScheme: 'triple-test',
  //   afOnelinkId: '',
  //   afOnelinkPid: '',
  //   afOnelinkSubdomain: '',
  //   defaultPageDescription: '',
  //   defaultPageTitle: '',
  //   facebookAppId: '',
  //   webUrlBase: '',
  // })
})

test('인 앱 웹뷰에서는 딥링크로 이동합니다.', () => {
  const { result } = renderHook(() => useOpenNativeLink(), {
    wrapper: TestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.Android, version: '6.5.0' },
      },
      sessionProvider: { user: null },
      userAgentProvider: {
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
        browser: { name: 'WebKit', version: '605.1.15', major: '605' },
        engine: { name: 'WebKit', version: '605.1.15' },
        os: { name: 'iOS', version: '13.3.1' },
        device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
        cpu: { architecture: undefined },
        isMobile: true,
      },
    }),
  })

  result.current('/test-path')

  // Assuming makeInlink is a function that formats the URL correctly
  expect(window.location.href).toBe('triple-test:///test-path')
})

test('인 앱 웹뷰가 아니면 TransitionModal을 엽니다.', () => {
  const { result } = renderHook(() => useOpenNativeLink(), {
    wrapper: TestWrapper({
      clientAppProvider: null,
      userAgentProvider: {
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        browser: {
          name: 'Chrome',
          version: '120.0.0.0',
          major: '120',
        },
        cpu: {
          architecture: 'arm64',
        },
        device: {
          type: undefined,
          model: 'Macintosh',
          vendor: 'Apple',
        },
        engine: {
          name: 'Blink',
          version: '120.0.0.0',
        },
        os: {
          name: 'macOS',
          version: '13.4.0',
        },
        isMobile: true,
      },
    }),
  })

  result.current('/test-path')

  expect(transitionModalShowMockFn).toHaveBeenCalled()
})
