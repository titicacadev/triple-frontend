import { renderHook } from '@testing-library/react'
import {
  ClientAppName,
  TestWrapper,
  useClientAppActions,
  useEnv,
} from '@titicaca/triple-web'

import {
  useSendVerifiedMessage,
  useVerifiedMessageListener,
} from './verified-message'

jest.mock('@titicaca/triple-web')

afterEach(() => {
  jest.clearAllMocks()
})

describe('useSendVerifiedMessage', () => {
  beforeEach(() => {
    ;(useEnv as jest.MockedFunction<typeof useEnv>).mockReturnValue({
      webUrlBase: 'https://triple-dev.titicaca-corp.com',
    } as ReturnType<typeof useEnv>)
  })

  it('should call broadcastMessage if it is running on triple client', () => {
    const broadcastMessage = jest.fn()
    ;(
      useClientAppActions as jest.MockedFunction<typeof useClientAppActions>
    ).mockReturnValue({
      broadcastMessage,
    })

    const {
      result: { current: sendVerifiedMessage },
    } = renderHook(() => useSendVerifiedMessage(), {
      wrapper: TestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
      }),
    })

    sendVerifiedMessage({ type: 'USER_VERIFIED', phoneNumber: '010-1234-5678' })

    expect(broadcastMessage).toHaveBeenCalled()
  })

  it('should refer parent window if it is not running on triple client', () => {
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
      }),
    })

    sendVerifiedMessage({ type: 'USER_VERIFIED', phoneNumber: '010-1234-5678' })

    expect(postMessage).toHaveBeenCalled()
  })
})

describe('useVerifiedMessageListener', () => {
  it('should start subscription if it is running on triple client', () => {
    const subscribe = jest.fn()
    const unsubscribe = jest.fn()
    const handleVerifiedMessage = jest.fn() as Parameters<
      typeof useVerifiedMessageListener
    >['0']

    ;(
      useClientAppActions as jest.MockedFunction<typeof useClientAppActions>
    ).mockReturnValue({
      subscribe,
      unsubscribe,
    })

    renderHook(() => useVerifiedMessageListener(handleVerifiedMessage), {
      wrapper: TestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
      }),
    })

    expect(subscribe).toHaveBeenCalled()
  })

  it('should start event listener if it is not running on triple client', () => {
    const addEventListenerSpy = jest.spyOn(global.window, 'addEventListener')
    const handleVerifiedMessage = jest.fn() as Parameters<
      typeof useVerifiedMessageListener
    >['0']

    renderHook(() => useVerifiedMessageListener(handleVerifiedMessage), {
      wrapper: TestWrapper({
        clientAppProvider: null,
      }),
    })

    expect(addEventListenerSpy).toHaveBeenLastCalledWith(
      'message',
      expect.anything(),
    )
  })
})
