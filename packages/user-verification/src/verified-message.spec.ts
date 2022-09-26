import { renderHook } from '@testing-library/react-hooks'
import { useEnv } from '@titicaca/react-contexts'
import {
  useTripleClientActions,
  useTripleClientMetadata,
} from '@titicaca/react-triple-client-interfaces'

import {
  useSendVerifiedMessage,
  useVerifiedMessageListener,
} from './verified-message'

jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/react-triple-client-interfaces')

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
      useTripleClientActions as jest.MockedFunction<
        typeof useTripleClientActions
      >
    ).mockReturnValue({
      broadcastMessage,
    })
    ;(
      useTripleClientMetadata as jest.MockedFunction<
        typeof useTripleClientMetadata
      >
    ).mockReturnValue({
      appVersion: '5.11.0',
      appName: 'Triple-iOS',
    })

    const {
      result: { current: sendVerifiedMessage },
    } = renderHook(() => useSendVerifiedMessage())

    sendVerifiedMessage({ type: 'USER_VERIFIED', phoneNumber: '010-1234-5678' })

    expect(broadcastMessage).toBeCalled()
  })

  it('should refer parent window if it is not running on triple client', () => {
    /* HACK: Global window에 opener 속성이 정의되지 않아 직접 정의했습니다. */
    Object.defineProperty(global.window, 'opener', {
      configurable: true,

      get() {
        return null
      },
    })
    ;(
      useTripleClientMetadata as jest.MockedFunction<
        typeof useTripleClientMetadata
      >
    ).mockReturnValue(null)

    const openerSpy = jest.spyOn(global.window, 'opener', 'get')
    const postMessage = jest.fn()

    openerSpy.mockReturnValue({
      postMessage,
    } as unknown as Window)

    const {
      result: { current: sendVerifiedMessage },
    } = renderHook(() => useSendVerifiedMessage())

    sendVerifiedMessage({ type: 'USER_VERIFIED', phoneNumber: '010-1234-5678' })

    expect(postMessage).toBeCalled()
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
      useTripleClientActions as jest.MockedFunction<
        typeof useTripleClientActions
      >
    ).mockReturnValue({
      subscribe,
      unsubscribe,
    })
    ;(
      useTripleClientMetadata as jest.MockedFunction<
        typeof useTripleClientMetadata
      >
    ).mockReturnValue({
      appVersion: '5.11.0',
      appName: 'Triple-iOS',
    })

    renderHook(() => useVerifiedMessageListener(handleVerifiedMessage))

    expect(subscribe).toBeCalled()
  })

  it('should start event listener if it is not running on triple client', () => {
    const addEventListenerSpy = jest.spyOn(global.window, 'addEventListener')
    const handleVerifiedMessage = jest.fn() as Parameters<
      typeof useVerifiedMessageListener
    >['0']

    ;(
      useTripleClientMetadata as jest.MockedFunction<
        typeof useTripleClientMetadata
      >
    ).mockReturnValue(null)

    renderHook(() => useVerifiedMessageListener(handleVerifiedMessage))

    expect(addEventListenerSpy).lastCalledWith('message', expect.anything())
  })
})
