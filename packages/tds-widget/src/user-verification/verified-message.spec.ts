import { renderHook } from '@testing-library/react'
import { ClientAppName, TestWrapper } from '@titicaca/triple-web'

import {
  useSendVerifiedMessage,
  useVerifiedMessageListener,
} from './verified-message'

const broadcastMessageMockFn = jest.fn()
const subscribeMockFn = jest.fn()
const unsubscribeMockFn = jest.fn()

jest.mock('@titicaca/triple-web', () => ({
  ...jest.requireActual('@titicaca/triple-web'),
  useEnv: jest.fn().mockReturnValue({
    webUrlBase: 'https://triple-dev.titicaca-corp.com',
  }),
  useClientAppActions: jest.fn().mockImplementation(() => ({
    broadcastMessage: broadcastMessageMockFn,
    subscribe: subscribeMockFn,
    unsubscribe: unsubscribeMockFn,
  })),
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('useSendVerifiedMessage', () => {
  test('should call broadcastMessage if it is running on triple client', () => {
    const {
      result: { current: sendVerifiedMessage },
    } = renderHook(() => useSendVerifiedMessage(), {
      wrapper: TestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
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

    sendVerifiedMessage({ type: 'USER_VERIFIED', phoneNumber: '010-1234-5678' })

    expect(broadcastMessageMockFn).toHaveBeenCalled()
  })

  test('should refer parent window if it is not running on triple client', () => {
    /* HACK: Global window에 opener 속성이 정의되지 않아 직접 정의했습니다. */
    Object.defineProperty(global.window, 'opener', {
      configurable: true,

      get() {
        return null
      },
    })

    const openerSpy = jest.spyOn(global.window, 'opener', 'get')
    const postMessage = jest.fn()

    openerSpy.mockReturnValue({
      postMessage,
    } as unknown as Window)

    const {
      result: { current: sendVerifiedMessage },
    } = renderHook(() => useSendVerifiedMessage(), {
      wrapper: TestWrapper({
        clientAppProvider: null,
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

    sendVerifiedMessage({ type: 'USER_VERIFIED', phoneNumber: '010-1234-5678' })

    expect(postMessage).toHaveBeenCalled()
  })
})

describe('useVerifiedMessageListener', () => {
  test('should start subscription if it is running on triple client', () => {
    const handleVerifiedMessage = jest.fn() as Parameters<
      typeof useVerifiedMessageListener
    >['0']

    renderHook(() => useVerifiedMessageListener(handleVerifiedMessage), {
      wrapper: TestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
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

    expect(subscribeMockFn).toHaveBeenCalled()
  })

  test('should start event listener if it is not running on triple client', () => {
    const addEventListenerSpy = jest.spyOn(global.window, 'addEventListener')
    const handleVerifiedMessage = jest.fn() as Parameters<
      typeof useVerifiedMessageListener
    >['0']

    renderHook(() => useVerifiedMessageListener(handleVerifiedMessage), {
      wrapper: TestWrapper({
        clientAppProvider: null,
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

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'message',
      expect.anything(),
    )
  })
})
